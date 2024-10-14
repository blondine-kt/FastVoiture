import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import React, { useRef } from 'react';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera'
import { faRotateLeft} from '@fortawesome/free-solid-svg-icons/faRotateLeft'

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const camRef = useRef<CameraView>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }
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
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={camRef} >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
          <FontAwesomeIcon icon={faCamera} />
          </TouchableOpacity>
           </View>
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
          <FontAwesomeIcon icon={faRotateLeft} />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    height: 50,
    width: 50,
    flexDirection:'column-reverse',
    backgroundColor: 'white',
    margin: 50,
    borderCurve:'circular',
    borderColor:'gray',
    borderStyle:'solid',
    borderWidth:3,
    borderRadius: 35,
    alignItems:'center',
    alignContent:'center',
    justifyContent:'center',
  },
  button: {
    alignItems: 'center',
    alignContent:'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
