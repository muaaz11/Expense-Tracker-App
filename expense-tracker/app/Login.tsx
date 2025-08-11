import { Text } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '../components/Typo'


export default function Login() {
  return (
    <ScreenWrapper>
      <Typo>
        hello
      </Typo>
      {/* <Typo size={30}>hello</Typo> */}
      <Text>welcom</Text>
    </ScreenWrapper>
  )
}