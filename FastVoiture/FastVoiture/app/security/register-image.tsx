import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Modal, Image } from "react-native";
import { CameraView } from "expo-camera";



import styles from "./styles";



export default function CameraScreen() {
  const camRef = useRef<CameraView>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  

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