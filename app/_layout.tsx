import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  useFonts({
    'outfit-regular': require('../assets/fonts/Outfit-VariableFont_wght.ttf'),
  });

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="editprofile" />
      <Stack.Screen name="fishprofile" />
      <Stack.Screen name="fishdetail" />
      <Stack.Screen name="waittingapproval" />
      <Stack.Screen name="approve" />
      <Stack.Screen name="isgoing" />
    </Stack>
  );
}
