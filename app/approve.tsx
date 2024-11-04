import React from 'react';
import { Stack } from 'expo-router';
import Approve from '../components/screens/profile/Approve';

export default function ApprovePage() {
  return (
    <>
      <Stack.Screen 
        options={{ 
          headerShown: false,
        }} 
      />
      <Approve />
    </>
  );
}