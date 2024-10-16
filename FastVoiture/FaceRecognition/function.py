import cv2
import pygame
pygame.init()
pygame.mixer.init()
import os
import cv2
import numpy as np
import dlib
from skimage.feature import graycomatrix, graycoprops

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


cam=cv2.VideoCapture(0)


FrameWidth=50
Frameheigth=70
cam.set(3,FrameWidth)
cam.set(4,Frameheigth)


def namePercentage(elements):
    # Vérifie si la liste est vide
    if not elements:
        return None
    # Trouve l'élément avec le pourcentage le plus élevé
    highest_element = min(elements, key=lambda item: item[1])
    return highest_element[0]



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


def saved(names,url):
    while cam.isOpened:
        success,frame=cam.read()
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY) 
          # Détecter les visages
        faces = detector(gray)
        if len(faces) > 0:
            cv2.imshow('Reconnaissance faciale',frame)
            cv2.imwrite(f'./images/{names}.jpg', frame)
            print("Image enregistrée.")
            break
    cam.release()
    cv2.destroyAllWindows()
    face_image = extract_face(f'./images/{names}.jpg')
    if face_image is not None:
        cv2.imwrite(f'./image_traiter/{names}.jpg', face_image)
    process_datasets(f'./image_traiter/')



def login(url):
    name_User='unknow'
    # Load signatures
    elements = []
    original_signature = np.load('signatures.npy')
    while cam.isOpened:
        success,frame=cam.read()
        frame_preprocess=preprocess_image(frame)
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY) 
          # Détecter les visages
        faces = detector(gray)
        
        if len(faces) > 0:
            cv2.imshow('Reconnaissance faciale',frame)
            cv2.imwrite('./test/test.jpg', frame)
            face_extract=extract_face('./test/test.jpg')
            if face_extract is not None:
                cv2.imwrite('./test_traiter/test.jpg', face_extract)
                break
            print("Image capturée et enregistrée.")
            break
    cam.release()
    cv2.destroyAllWindows()
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
    

def euclidean(v1, v2):
    v1 = np.array(v1).astype(np.float32)
    v2 = np.array(v2).astype(np.float32)
    dist = np.sqrt(np.sum(v1-v2)**2)
    return dist

def preprocess_image(frame):
    # Redimensionner l'image et normaliser
    resized = cv2.resize(frame, (100, 100))
    normalized = cv2.normalize(resized, None, 0, 255, cv2.NORM_MINMAX)
    return normalized

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


            