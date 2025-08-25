import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import { AppProvider } from '../context/store.js'

export default function RootLayout() {
  return (
    <AppProvider>
     
      <Stack screenOptions={{headerShown: false}} initialRouteName="index">
        <Stack.Screen name="index" />
        <Stack.Screen name="Login" />
        <Stack.Screen name="Register" />
        <Stack.Screen name="Welcome" />
        <Stack.Screen name="Landing" />
      </Stack>
      <Toast />
    </AppProvider>
  )
  
}
