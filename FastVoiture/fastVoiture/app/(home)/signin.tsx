import React from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios, { AxiosError } from 'axios'


import { Link, Redirect, router, useRouter } from "expo-router";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons/faCamera";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons/faMicrophone";

// import user context
import { useUser } from "../userauth";

interface FormValues {
  username: string;
  password: string;
}


const validationSchema = Yup.object().shape({
  username: Yup.string().required("Le username est requis"),
  password: Yup.string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractere")
    .required("Le mot de passe est requis"),
});

const MyForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  
  const { setUser } = useUser();
  

  const onSubmit = async(data: FormValues) => {
    if(data != null){
      try{
         
        const response = await axios.post("http://10.1.10.193:8040/Login/",{ 
          'userName': data.username,
          'password': data.password,
        });
        if(response.status == 200){
          const result = await response;
          console.log(result);
          //Alert.alert("Form Submitted", JSON.stringify(result));
          const user ={
            'name': data.username,
            'password':data.password,
          }
          setUser(user)
          router.push('/(home)/(tabs)/acceuil')
        }
       

      }catch (error) {
        const axiosError = error as AxiosError; 

        if (axiosError.response) {
          console.error("Error data:", axiosError.response.data);
        } else {
          console.error("Error:", axiosError);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Nom d'utilisateur"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              style={styles.inputs}
              error={!!errors.username}
            />
          )}
          name="username"
          rules={{ required: true }}
        />
        {errors.username && (
          <Text style={styles.error}>{errors.username.message}</Text>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Mot de passe"
              secureTextEntry
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              style={styles.inputs}
              error={!!errors.password}
            />
          )}
          name="password"
          rules={{ required: true }}
        />
        {errors.password && (
          <Text style={styles.error}>{errors.password.message}</Text>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.text} >
              Se connecter
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.push("/inscription")}>
            <Text style={styles.link}>Creer un compte</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.icon_wrapper}>
          <TouchableOpacity
            style={styles.camera_icon}
            onPress={() => router.push("/camera_acess")}
          >
            <FontAwesomeIcon icon={faCamera} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.camera_icon} 
          onPress={()=> router.push("/microphone_access")}>
           
            <FontAwesomeIcon icon={faMicrophone} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    height: "65%",
    width: "75%",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "blue",
    borderWidth: 1,
    flexDirection: "column",
    elevation: 40,
  },
  inputs: {
    height: 45,
    borderColor: "#2a9ec6",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    marginTop: 20,
    marginHorizontal: 10,
  },
  icon_wrapper: {
    flex: 1,
    flexDirection: "row",
    alignContent: "space-between",
    alignItems: "center",
    justifyContent: "space-between",
  },
  camera_icon: {
    height: 50,
    width: 50,
    backgroundColor: "#5faaaa",
    borderStyle: "solid",
    borderColor: "#5faaaa",
    borderRadius: 35,
    marginHorizontal: 25,
    borderCurve: "circular",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  link: {
    padding: 0,
    fontSize: 24,
    textDecorationLine: "underline",
    color: "blue",
    textAlign: "center",
  },
  buttonContainer: {
    backgroundColor: "#5faaaa",
    margin: 64,
    borderStyle: "solid",
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
    opacity: 0.4,
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "blue",
  },
  error: {
    fontSize: 12,
    color: "red",
    marginBottom: 12,
  },
});

export default MyForm;
