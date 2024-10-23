import { Stack } from 'expo-router';
import React from 'react';
import { UserProvider } from './userauth';

export default function RootLayout() {
  return (
    <UserProvider>
    <Stack>
      <Stack.Screen name="(home)" options={{ headerShown: false }}/>
      <Stack.Screen name = "security" options={{ headerShown: false }}/>
      <Stack.Screen name ="(locs)" options={{ headerShown: false }}/>
    </Stack>
    </UserProvider>
  );
}
