import cv2
import os
import cv2
import numpy as np
import dlib
from skimage.feature import graycomatrix, graycoprops
import requests
from flask import request
from io import BytesIO
from PIL import Image

#converti une image PIl en cv2
def pil_to_cv2(pil_image):
    return cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)

#recupere une image a partir d'un url web
def getImages(adresse):
    print(adresse)
    try:
        response=requests.get(adresse)
        if response.status_code!=200:
            print('imposiible de telecharger')
            return "impossible de telecharger l'image",400
        picture=Image.open(BytesIO(response.content))
        img=pil_to_cv2(picture)
        return img
    except Exception as e:
        return str(e),500
    
#descripteur glcm
def glcm(image_path):
    data = cv2.imread(image_path, 0)
    co_matrix = graycomatrix(data, [1], [np.pi/4], None,symmetric=True, normed=True )
    dissimilarity = graycoprops(co_matrix, 'dissimilarity')[0, 0]
    cont = graycoprops(co_matrix, 'contrast')[0, 0]
    corr = graycoprops(co_matrix, 'correlation')[0, 0]
    ener = graycoprops(co_matrix, 'energy')[0, 0]
    asm = graycoprops(co_matrix, 'ASM')[0, 0]
    homo = graycoprops(co_matrix, 'homogeneity')[0, 0]
    return [dissimilarity, cont, corr, ener, asm, homo]


# Chargement du détecteur de visages
detector = dlib.get_frontal_face_detector()

#recupere et donne la distance la plus proche
def namePercentage(elements):
    # Vérifie si la liste est vide
    if not elements:
        return None
    # Trouve l'élément avec la distances la plus faible
    highest_element = min(elements, key=lambda item: item[1])
    return highest_element[0]


#creer la signature original
def process_datasets(root_folder):
    all_features = [] # List to store all features and metadatas
    for root, dirs, files in os.walk(root_folder):
        #print(root)
        for file in files:
            #print(file)
            if file.lower().endswith(('.jpg','.png', '.jpeg')):
                # Construct relative path
                relative_path = os.path.relpath(os.path.join(root, file), root_folder)
                image_rel_path = os.path.join(root, file)
                features = glcm(image_rel_path)
                features = features + [ relative_path]
                all_features.append(features)
    print(all_features)
    signatures = np.array(all_features)
    np.save('signatures.npy', signatures)
    print('Successfully stored!')

#creer une signature de test
def img_test(root_folder):
    all_features = [] # List to store all features and metadatas
    for root, dirs, files in os.walk(root_folder):
        #print(root)
        for file in files:
            #print(file)
            if file.lower().endswith(('.jpg','.png', '.jpeg')):
                # Construct relative path
                relative_path = os.path.relpath(os.path.join(root, file), root_folder)
                image_rel_path = os.path.join(root, file)
                features = glcm(image_rel_path)
                features = features + [ relative_path]
                all_features.append(features)
    print(all_features)
    signatures = np.array(all_features)
    np.save('test.npy', signatures)
    print('Successfully stored!')



# fonction qui permet de m'enregistrer grace au lien de l'image 
def saved(names,url):
    try:
        frame=getImages(url)
        print(frame)
        cv2.imwrite(f'./images/{names}.jpg',frame)
        print('milieu')
        face_image = extract_face(f'./images/{names}.jpg')
        if face_image is not None:
            print('erreur decoupage')
            cv2.imwrite(f'./image_traiter/{names}.jpg', face_image)
        process_datasets(f'./image_traiter/')
    except Exception as e:
        return f"l'erreur est : {e}"


#verifie la correspondance des images
def login(url):
    name_User='unknow'
    # Load signatures
    elements = []
    try:
        original_signature = np.load('signatures.npy')
        frame=getImages(url)
        cv2.imwrite('./test/test.jpg', frame)
        face_extract=extract_face('./test/test.jpg')
        if face_extract is not None:
            cv2.imwrite('./test_traiter/test.jpg', face_extract)
        print("Image capturée et enregistrée.")
        #create signatures for image test
        test_folder='test_traiter/' 
        image_path = os.path.join(test_folder)
        img_test(image_path)
        test_signature=np.load('test.npy')
        print(f'ori_table:{original_signature}')
        print(f'ori:{len(original_signature)}')
        print(f'test:{len(test_signature)}')
        # Charger les images  
        for i in range (len(original_signature)):
            image2=original_signature[i-1,:-1].astype(np.float32)
            names = original_signature[i-1,-1]
            print(names) 
            for y in range (len(test_signature)):
                image1= test_signature[y-1,:-1].astype(np.float32)
                distances=euclidean(image2,image1)
                print(f'la distance est de : {distances}')
                if distances is not None :
                    # Afficher le nom si la similarité est au-dessus d'un seuil
                    name = names.replace('.jpg', '')
                    print("Nom:", name)  # Assurez-vous que 'names' est défini
                    if distances<=80:
                        elements.append((name, distances))
                        name_User=namePercentage(elements)
                    else :
                        pass
        if name_User:
            return name_User
        else:
            pass
    except Exception as e:
        return f'lerreur est : {e}'
    

def euclidean(v1, v2):
    v1 = np.array(v1).astype(np.float32)
    v2 = np.array(v2).astype(np.float32)
    dist = np.sqrt(np.sum(v1-v2)**2)
    return dist

#recupere les donnees du visages et decoupe la photo pour ne garder que le visage
def extract_face(image_path):
    # Lire l'image
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    # Détecter les visages
    faces = detector(gray)
    if len(faces) > 0:
        # Prenez le premier visage détecté
        face = faces[0]
        x, y, w, h = (face.left(), face.top(), face.right() - face.left(), face.bottom() - face.top())
        # Recadrer l'image pour ne garder que le visage
        face_image = image[y:y+h, x:x+w]
        return face_image
    else:
        print("Aucun visage détecté.")
        return None


            