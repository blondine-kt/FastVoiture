import { Link, Stack } from 'expo-router';
import {StyleSheet, Text, View,Animated,ScrollView,TouchableOpacity } from "react-native";
import React,{ useRef } from "react";
import { useRouter } from 'expo-router';


export default function HomeScreen() {
  const scrollX = useRef(new Animated.Value(0)).current;

  const router = useRouter();

  // const scrollToIndex = (index) => {
  //   Animated.timing(scrollX, {
  //     toValue: index * 200, 
  //     duration: 300,
  //     useNativeDriver: true,
  //   }).start();
  // };
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
      <Text style={styles.header}>Hello this is Fast Voiture</Text>
    </View>
    <View style={styles.body}>
      <Text style={styles.header}>Get Started</Text>
    </View >
    <View style={styles.body} >
      <Text style={styles.header}> A new way growth</Text>
      </View>
    </Animated.ScrollView>

    <View style={styles.buttonContainer}>
         
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/signin')}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
          
        
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
   
    height: '60%',
    width: '25%',
    borderStyle:"solid" ,
    borderColor:"#2a9ec6",
    borderWidth:2,
    paddingTop:80,
    paddingHorizontal:40,
    paddingBottom:10,
    marginRight:30,
    marginLeft:30,
    marginTop:80,
    backgroundColor:'#FFF',
    borderRadius:10,
  },
  header:{
    fontSize:24,
    fontWeight:"bold",
    paddingTop:15,
    paddingHorizontal:10,
    marginRight:25,
    marginTop:20,
    marginBottom:20,
    

  },
  scrollView: {
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom:30,
    
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
});