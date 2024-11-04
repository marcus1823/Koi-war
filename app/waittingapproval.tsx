import React from 'react';
import { Stack } from 'expo-router';
import WaittingApproval from '../components/screens/profile/WaittingApproval';

export default function WaitingApprovalPage() {
  return (
    <>
      <Stack.Screen 
        options={{ 
          headerShown: false,
        }} 
      />
      <WaittingApproval />
    </>
  );
}