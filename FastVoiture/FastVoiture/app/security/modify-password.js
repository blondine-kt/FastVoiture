import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useUser } from '../userauth'; 



const user = useUser()
const password = user.user.password
const schema = yup.object().shape({
  newPassword: yup
    .string()
    .required('Entrez votre nouveau mot de passe')
    .min(6, 'Le mot de passe doit contenir au moins 6 carateres'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Les mots de passes ne sont pas pareils')
    .required('Confirmer le mot de passe'),
});

const ModifyPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // Handle password modification logic here
    const formdata = {... data}
    Alert.alert('Password modified', JSON.stringify(formdata));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modifier Mot de Passe:</Text>

      <View style={styles.inputContainer}>
        <Text>Nouveau mot de passe:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          {...register('newPassword')}
        />
        {errors.newPassword && <Text style={styles.error}>{errors.newPassword.message}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text>Confirmer nouveau mot de passe:</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword.message}</Text>}
      </View>

      <Button title="Change Password" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  error: {
    color: 'red',
    marginTop: 4,
  },
});

export default ModifyPassword;
