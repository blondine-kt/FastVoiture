import React, { useState } from 'react';
import { View, Button, Alert } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';



const RecordAudio: React.FC = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);


  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access microphone is required!');
        return;
      }

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
    } catch (err) {
      console.error('Failed to start recording:', err);
    }
  };

  const stopRecording = async () => {
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI(); // The URI of the recorded audio
      setRecording(null);
      if (uri != null){
        await uploadAndCompareVoice(uri);
      }
      
    }
  };

  const uploadAndCompareVoice = async (uri: string) => {
    const apiUrl = 'http://192.168.2.11:5000/se_connecter'; 
    const formData = new FormData();

     // Use FileSystem to read the file as a blob
     const response = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });
     
    const base64Blob = `data:audio/wav;base64,${response}`;
  
  
   // Appends the blob to the FormData
   formData.append('file', {
    uri,
    name: 'voice_recording.wav', 
    type: 'audio/wav', 
  } as unknown as Blob);
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const result = await response.json();
      if (result.match) {
        Alert.alert('Match found!', `Username: ${result.username}`);
      } else {
        Alert.alert('No match found.');
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };
   

  return (
    <View>
      <Button title={recording ? 'Stop Recording' : 'Start Recording'} onPress={recording ? stopRecording : startRecording} />
    </View>
  );
};

export default RecordAudio;
