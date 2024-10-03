import React from "react";
import{View, StyleSheet, Text,ScrollView, TextInput} from "react-native";


export default function Sign_in (){
   return(
    <ScrollView>
       <Text>
        Connexion
        </Text> 
    </ScrollView>
   )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        padding:20,
        marginBottom:10,
        height:'70%',
        width:'65%',
    }
})