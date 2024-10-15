import { Stack } from 'expo-router';
import React from 'react';
import { UserProvider } from '../userauth';


export default function HomeLayout() {
  return (
    
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2a9ec6',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
       
       <Stack.Screen name="index" options={{title:"Home"}} />
       <Stack.Screen name="signin" options={{title:"Connexion"}}/>
       <Stack.Screen name="inscription" options={{title:"Inscription"}}/>
       <Stack.Screen name='(tabs)' options={{ headerShown: false }}/>
    </Stack>
    
  );
}
