import React from 'react'
import { View,Text, StyleSheet, TouchableOpacity } from 'react-native'

import {useUser} from '../../userauth';


// user home portal

export default function Home(){

  const user = useUser()
  
    return (
      <View style={styles.container}>
       { /* View containing user name */ } 
        {user &&
        <View style={styles.header}> 
        <Text>Acceuil {user.user?.name}</Text>
        </View>
        }
        <View style={styles.wrapper}>
          <View style={styles.items}>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>
                Commençez à gagner
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>
               Renforçer la sécurité
             </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>
              Voirs les Activités
             </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>
               Aperçu des Services 
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
      backgroundColor: '#fff',
      

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
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 20,
      borderColor: "#2a9ec6",

    },
  }
) 
