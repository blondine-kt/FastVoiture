import { Link, Stack } from 'expo-router';
import {StyleSheet, Text, View,Animated,ScrollView,TouchableOpacity,Image } from "react-native";
import React,{ useRef } from "react";
import { useRouter } from 'expo-router';



export default function HomeScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;

  const router = useRouter();

  
  return (
    <View style={styles.container}>
       <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled={true}
        style={styles.scrollView}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
    <View
      style={
        styles.body
      }
    >
      <Text style={styles.header}>Fast Voiture, conduisez quand vous voulez et gagner</Text>
      <Image style={styles.image_container} source={require( '../../assets/images/car_icon.png')} />
    </View>
    <View style={styles.body}>
    <Text style={styles.paragraph}>Nous sommes ravis de vous avoir parmi nous.Votre rôle est essentiel pour faire briller 
      notre entreprise et offrir un service de qualité à nos clients. 
       Chaque trajet que vous effectuez contribue à notre succès collectif et à la satisfaction de ceux que nous servons.</Text>
    </View >
    <View style={styles.body} >
      <Text style={styles.header}> Commencer votre aventure en cliquant le bouton en dessous</Text>
      <Image style={styles.image_container} source={require( '../../assets/images/pointing-down.png')} />
      </View>
    </Animated.ScrollView>

    <View style={styles.buttonContainer}>
         
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/inscription')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
           
      </View>
      <View style={styles.url_container}>
        <Link style={styles.url_text} href={'/signin'}>Vous avez déja un compte? Se connecter</Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  body:{
   
    height: '65%',
    width: 360,
    borderStyle:"solid" ,
    borderColor:"#2a9ec6",
    borderWidth:2,
    paddingTop:15,
    paddingHorizontal:5,
    paddingBottom:10,
    marginRight:15,
    marginLeft:15,
    marginTop:40,
    backgroundColor:'#FFF',
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    fontFamily:'sans-serif-condensed',
  },
  image_container:{
   marginTop:10,
   padding:10,
   marginBottom:10,
   width:250,
   height:150,
  
  },
  header:{
    fontSize:20,
    fontWeight:"bold",
    paddingTop:10,
    paddingHorizontal:5,
    marginRight:15,
    marginTop:10,
  },
  scrollView: {
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom:10,
    
  },
  button: {
    backgroundColor: '#2a9ec6',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    width:'40%',
    alignItems:'center',
    
  },
  buttonText: {
    color: '#fff',
  },
  url_container:{
    
    marginTop:0,
    padding:5,
    
    marginBottom:15,

  },
  url_text:{
    textDecorationLine:'underline',
    color:'darkblue',
    
  },
  paragraph: {
    marginTop:0,
    
    padding: 10,
    fontSize:18 
  },

});