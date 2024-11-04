import React from 'react';
import { Stack } from 'expo-router';
import Checked from '../components/screens/profile/Checked';

export default function CheckedRegistrationPage() {
  return (
    <>
      <Stack.Screen 
        options={{ 
          headerShown: false,
        }} 
      />
      <Checked />
    </>
  );
}