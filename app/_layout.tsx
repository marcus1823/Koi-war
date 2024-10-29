import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  useFonts({
    "outfit-regular": require("../assets/fonts/Outfit-VariableFont_wght.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
  });

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="editprofile" />
      <Stack.Screen name="fishprofile" />
      <Stack.Screen name="predictresults" />
      <Stack.Screen name="progress" />
    </Stack>
  );
}
