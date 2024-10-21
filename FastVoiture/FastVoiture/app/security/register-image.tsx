import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Modal, Image, Alert } from "react-native";
import { CameraView } from "expo-camera";
import * as FileSystem from 'expo-file-system';



import styles from "./styles";
import {useUser} from '../userauth';



export default function CameraScreen() {
  const camRef = useRef<CameraView>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [username, setusername] = useState<string>('')

  const user = useUser()


  

  async function takePicture() {
    
    if (camRef && camRef.current) {
      const data = await camRef.current.takePictureAsync({
        quality:1,
        exif:false
      });
      
      if (data) {
        setCapturedPhoto(data.uri);

        setModalIsOpen(true);
      } else {
        console.error('No data returned from takePictureAsync');
      }
    }
    } 
     
    const uploadImage = async (uri: string) => {
      const formData = new FormData();

       // Use FileSystem to read the file as a blob
    const response = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
     
    const base64Blob = `data:audio/wav;base64,${response}`;

      formData.append('image', {
        uri: uri,
        name: 'photo.jpg', 
        type: 'image/jpeg', 
      } as unknown as Blob);
      if(user.user != null){
        setusername(user.user.name)
        formData.append('username',username );
      }
  
      try {
        const response = await fetch('http://192.168.2.11/register', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        const responseData = await response.json();
        if (response.ok) {
          Alert.alert('Success', responseData.message);
        } else {
          Alert.alert('Upload failed', responseData.error);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        Alert.alert('Upload failed', 'Something went wrong!');
      }
    };
    
  

  return (
    <CameraView
      style={{ flex: 1 }}
      facing="front"
      ratio="16:9"
      zoom={0}
      ref={camRef}
    >
      <View style={styles.mainView}>

        <TouchableOpacity style={styles.takePhoto} onPress={takePicture}>
          <Text style={styles.takePhotoText}>Take Picture</Text>
        </TouchableOpacity>
      </View>

      {capturedPhoto && (
        <Modal animationType="slide" transparent={false} visible={modalIsOpen}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              margin: 20,
            }}
          >
            <TouchableOpacity
              style={{ margin: 10 }}
              onPress={() => {
                setModalIsOpen(false);
              }}
            >
              <Text>Reprendre</Text>
            </TouchableOpacity>
            <Image
              style={{ width: "100%", height: 300, borderRadius: 20 }}
              source={{ uri: capturedPhoto }}
            />
          </View>
        </Modal>
      )}
    </CameraView>
  );
}