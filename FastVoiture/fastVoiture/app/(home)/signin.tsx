import React from "react";
import { useRouter } from 'expo-router';

import{View, StyleSheet, Text,ScrollView, TextInput} from "react-native";


export default function Sign_in (){
   return(
    
        <View style={styles.container}>
          <View style={styles.card}>
            
          </View>
        </View>
      
    
   )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",     
    },
    card:{
        height:'60%',
        width:'75%',
        backgroundColor:"#fff",
        borderRadius:10,
        borderStyle:"solid",
        borderColor:"blue",
        borderWidth:1,
        opacity:0.3,
        flexDirection:"column",
        elevation:50,

        

    }
})