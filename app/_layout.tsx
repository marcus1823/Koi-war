import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
      <Stack.Screen name="editprofile" options={{ headerShown: false }}/>
      <Stack.Screen name="fishprofile" options={{ headerShown: false }}/>
      <Stack.Screen name="predictresults" options={{ headerShown: false }}/>
      <Stack.Screen name="progress" options={{ headerShown: false }}/>
    </Stack>
  );
}
