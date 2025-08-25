import { StyleSheet, Text, View, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import BackButton from '@/components/BackButton'
import { colors, spacingX, spacingY } from '@/constant/style'
import Typo from '@/components/Typo'
import Input from '@/components/Input'
import Fontisto from '@expo/vector-icons/Fontisto';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Button from '@/components/Button'
import { verticalScale } from '@/utils/stying'
import { router } from 'expo-router'
import Toast from 'react-native-toast-message';
import asyncStorage from '@react-native-async-storage/async-storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { jwtDecode } from 'jwt-decode'
import { AppContext } from '@/context/store'

type MyJwtPayload = {
  id: string;
  // add other properties if needed
};


const Login = () => {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { setUserId, setAuthToken } = useContext(AppContext)
  const { userRef } = useContext(AppContext)

  const [isLoading, setIsLoading] = useState(false)

  const handlSubmit = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: "login",
        text2: "Please fill all fields",
        visibilityTime: 1500
      })
    }
    try {
      const response = await fetch("http://192.168.100.7:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      const result = await response.json()

      console.log("result", result);

      await AsyncStorage.setItem("TOKEN", result.token)
      setAuthToken(result.token);

      const decodeToken = jwtDecode<MyJwtPayload>(result.token)
      const storedUserToken = decodeToken?.id
      
      if (storedUserToken) {
        userRef.current = storedUserToken
        setUserId(storedUserToken)
      } else {
        console.log("No user found for this id");
      }  

      Toast.show({
        type: "success",
        text1: 'Congratulations',
        text2: "User Login Successfully"
      })

      router.navigate('/Landing');
    } catch (error) {
        console.error(error);
        Toast.show({
          type: "error",
          text1: 'Failed',
          text2: "Server Error Please try again later"
        })
      }
    } 

return (
  <ScreenWrapper >
    <View style={styles.container}>

      <BackButton />

      <View style={styles.text}>
        <Typo size={32} fontWeight={'800'}>Hey,</Typo>
        <Typo size={32} fontWeight={'800'}>Welcome Back.</Typo>
      </View>

      <View style={styles.form}>
        <Typo
          size={16}
          fontWeight={'100'}
          color={colors.textLight}
        >
          Login to track all your expenses
        </Typo>

        <Input
          placeholder="Enter Email"
          onChangeText={(email) => setEmail(email)}
          icon={
            <Fontisto
              name="email"
              size={24}
              color="white"
            />}
        />

        <Input
          placeholder="Enter Password"
          onChangeText={(pass) => setPassword(pass)}
          secureTextEntry
          icon={
            <MaterialIcons
              name="password"
              size={24}
              color="white"
            />
          }
        />

        <TouchableOpacity>
          <Typo style={{ alignSelf: 'flex-end' }} size={17}>Forgot password</Typo>
        </TouchableOpacity>

        <Button onPress={handlSubmit} loading={isLoading}>
          <Typo size={20} color={colors.black} fontWeight={"500"}>Login</Typo>
        </Button>
      </View>

      <View style={styles.footer}>
        <Typo size={15}>Don't have an account?</Typo>
        <Pressable onPress={() => router.push('/Register')}>
          <Typo size={15} style={styles.footerText} color={colors.primary} fontWeight={'600'}>
            Signup
          </Typo>
        </Pressable>
      </View>

    </View>
  </ScreenWrapper>
)
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
    gap: spacingY._20,
  },

  text: {
    marginTop: spacingY._10,
    gap: 5
  },

  form: {
    gap: spacingY._20,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  },

  footerText: {
    color: colors.primary
  }
})