import { StyleSheet, Text, View, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
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



const Register = () => {

  // const emailRef = useRef("")
  // const passwordRef = useRef("")



  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const handlSubmit = async () => {
    if (!email || !password || !name) {
      Toast.show({
        type: 'error',
        text1: "Login",
        text2: "Please fill all fields",
        visibilityTime: 1500
      })
      return;
    }

    try {
      const response = await fetch(`http://192.168.100.7:4000/api/v1/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password,
          name
        })
      });

      const result = await response.json();
      console.log(result);

      if (result.success) {
        Toast.show({
          type: "success",
          text1: 'Congratulations',
          text2: "User Registered Successfully"
        })
        router.navigate('/Login')
      } else {
        Toast.show({
          type: "error",
          text1: 'Failed',
          text2: result.message || "Failed to register"
        })
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        type: "error",
        text1: 'Failed',
        text2: "Server Error Please try again later"
      })
    }
  };


  return (
    <ScreenWrapper >
      <View style={styles.container}>

        <BackButton />

        <View style={styles.text}>
          <Typo size={32} fontWeight={'800'}>Let's,</Typo>
          <Typo size={32} fontWeight={'800'}>Get started</Typo>
        </View>

        <View style={styles.form}>
          <Typo
            size={16}
            fontWeight={'100'}
            color={colors.textLight}
          >
            Register to track all your expenses
          </Typo>

          <Input
            placeholder="Enter name"
            onChangeText={(name) => setName(name)}
            icon={
              <Fontisto
                name="email"
                size={24}
                color="white"
              />}
          />


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

          <Button onPress={handlSubmit} loading={isLoading}>
            <Typo size={20} color={colors.black} fontWeight={"500"}>Register</Typo>
          </Button>
        </View>

        <View style={styles.footer}>
          <Typo size={15}>Already have an account?</Typo>
          <Pressable onPress={() => router.push('/Login')}>
            <Typo size={15} style={styles.footerText} color={colors.primary} fontWeight={'600'}>
              Login
            </Typo>
          </Pressable>
        </View>

      </View>
    </ScreenWrapper>
  )
}

export default Register

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