import React from 'react'
import { View,Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router';

import {useUser} from '../userauth';


export default function ProfileScreen() {
    const user = useUser()
    const router = useRouter()
  
    return (
     <View style={styles.container}>
        { /* View containing user name */ } 
     {user &&
     <View> 
     <Text  style={styles.header}> Securite{user.user?.name}</Text>
     </View>}
     <View style={styles.wrapper}>
     <View style={styles.items}>
     <TouchableOpacity style={styles.item} onPress={
        () => router.push('/security/modify-password')
     }>
        <Text style={styles.itemText}>
        Modifier Mot de Passe
        </Text>
     </TouchableOpacity>
     <TouchableOpacity style={styles.item} onPress={
        () => router.push('/security/register-image')}>
        <Text style={styles.itemText}>
            Reconnaissance Faciale
        </Text>
     </TouchableOpacity>
     <TouchableOpacity style={styles.item} onPress={()=> router.push('/security/register-voice')}>
        <Text style={styles.itemText}>
           Reconnaissance Vocale 
        </Text>
     </TouchableOpacity>
     </View>
     </View>
     </View>
    )
  
}








const styles = StyleSheet.create(
    {
        container:{
          flex: 1,
          backgroundColor: '#E8EAED',
          
    
        } ,
        header:{
          fontSize:24,
          fontStyle:"normal",
          textAlign:"center",
          fontWeight:"bold",
          fontFamily:'sans-serif-condensed',
          padding:10,
    
    
        },
        wrapper:{
          paddingTop: 80,
          paddingHorizontal: 20,
          
          
        },
        items:{
          marginTop: 30,
    
        },
        itemText: {
          maxWidth: '80%',
        },
        item: {
          backgroundColor: '#FFF',
          padding: 15,
          borderWidth:2,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 20,
          borderColor: "#2a9ec6",
          
        },
      }
) 
  

