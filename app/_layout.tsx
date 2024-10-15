import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="editprofile" />
      <Stack.Screen name="fishprofile" />
      <Stack.Screen name="predictresults" />
      <Stack.Screen name="progress" />

    </Stack>
  );
}
