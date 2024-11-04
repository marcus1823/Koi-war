import React from 'react';
import { Stack } from 'expo-router';
import Rejected from '../components/screens/profile/Rejected';

export default function RejectedPage() {
  return (
    <>
      <Stack.Screen 
        options={{ 
          headerShown: false,
        }} 
      />
      <Rejected />
    </>
  );
}
