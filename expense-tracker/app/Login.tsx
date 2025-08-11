import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import BackButton from '@/components/BackButton'
import { colors, spacingX, spacingY } from '@/constant/style'
import Typo from '@/components/Typo'

const Login = ({ }) => {
  return (
    <ScreenWrapper style={styles.container}>
      <View> 
        <BackButton />

        <View style={styles.text}>
          <Typo size={32} fontWeight={'800'}>Hey,</Typo>
          <Typo size={32} fontWeight={'800'}>Welcome Back.</Typo>
          <Typo size={20} fontWeight={'100'}>Login to continue using our application</Typo>
        </View>

      </View>
    </ScreenWrapper>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  text: {
    marginHorizontal: spacingX._20
  }
})