import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import Toast, { BaseToast, BaseToastProps } from 'react-native-toast-message';

const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#4CAF50',
        backgroundColor: '#fff',
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: '600'
      }}
      text2Style={{
        fontSize: 14
      }}
    />
  ),
  error: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: '#f44336',
        backgroundColor: '#fff',
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1Style={{
        fontSize: 16,
        fontWeight: '600'
      }}
      text2Style={{
        fontSize: 14
      }}
    />
  )
};

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
      <Stack.Screen name="fishdetail" />
      <Stack.Screen name="waittingapproval" />
      <Stack.Screen name="approve" />
      <Stack.Screen name="isgoing" />
      <Stack.Screen name="contestInstances" />
      <Stack.Screen name="staff/(tabs)" />
      <Toast config={toastConfig} />
    </Stack>
  );
}
