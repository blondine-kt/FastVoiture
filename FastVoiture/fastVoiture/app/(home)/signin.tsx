import React, { useState } from "react";
import { useRouter } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons/faCamera'
import { faMicrophone} from '@fortawesome/free-solid-svg-icons/faMicrophone'


import{View, StyleSheet, Text,ScrollView, TextInput, Button, TouchableOpacity} from "react-native";


export default function Sign_in (){
    const router = useRouter();
   
    
   return(
    
        <View style={styles.container}>
          <View style={styles.card}>
           
            <TextInput
            placeholder="Nom d'utilisateur"
            style={styles.inputs}
            ></TextInput>
            
            <TextInput
            placeholder="Mot de passe"
            secureTextEntry
            style={styles.inputs}
            >
            </TextInput>

            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
           <Text style={styles.text}>Se connecter</Text>        
              </TouchableOpacity>
           </View>
           <View style={styles.icon_wrapper}>
           <TouchableOpacity 
           style={styles.camera_icon}
           onPress={() => router.push('camera_acess')}>
           <FontAwesomeIcon icon={faCamera} />
           </TouchableOpacity>
           <TouchableOpacity style={styles.camera_icon}>
           <FontAwesomeIcon icon={faMicrophone} />
           </TouchableOpacity>
           </View>
          </View>
        </View>
      
   )} 
 




const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",     
    },
    card:{
        height:'53%',
        width:'75%',
        backgroundColor:"#fff",
        borderRadius:10,
        borderStyle:"solid",
        borderColor:"blue",
        borderWidth:1,
        flexDirection:"column",
        elevation:50,

    },
    inputs:{
        height: 40,
        borderColor: '#2a9ec6',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        borderRadius:30,
        marginTop:15,
        marginHorizontal:10,

    },
    icon_wrapper:{
        flex:1,
        flexDirection:'row',
        alignContent:'space-between',
        alignItems:'center',
        justifyContent:'space-between'

        
    },
    camera_icon: {
       height:50,
       width:50,
       backgroundColor:"#5faaaa",
       borderStyle:"solid",
       borderColor:"#5faaaa",
       borderRadius:35,
       marginHorizontal:25,
       borderCurve:'circular',
       alignItems:'center',
       justifyContent:'center',
       borderWidth: 1,
    
      },

    buttonContainer: {
        backgroundColor: '#5faaaa',
        margin: 64,
        borderStyle:"solid",
        borderRadius:10,
        alignItems:'center',
        padding:10,
        opacity:0.4,
      },
      button: {
        alignSelf: 'flex-end',
        alignItems: 'center',
      },
      text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'blue',
      },
    
})