import { View, Text, StyleSheet, Platform, Dimensions, StatusBar } from 'react-native'
import React from 'react'
import { ScreenWrapperProps } from '@/types'
import { colors } from '@/constant/style'

const { height } = Dimensions.get('window')

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
  let paddingTop = Platform.OS == 'ios' ? height * 0.5 : 50

  return (
    <View style={[style, {
      paddingTop,
      flex: 1,
      backgroundColor: colors.neutral900
    }]}>
      <StatusBar barStyle={'light-content'} />
      {children}
    </View>
  )
}

export default ScreenWrapper