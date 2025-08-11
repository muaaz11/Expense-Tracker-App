import { View, Text, TextStyle } from 'react-native'
import React from 'react'
import { colors } from '@/constant/style'
import { TypoProps } from '@/types'
import { verticalScale } from '@/utils/stying'

const Typo = ({
  size,
  color = colors.text,
  fontWeight = "400",
  children,
  style,
  textProps = {}
}: TypoProps) => {

  const textStyle: TextStyle = {
    fontSize: size? verticalScale(size) : verticalScale(18),
    color,
    fontWeight
  }

  return (
    <Text style={[textStyle, style]} {...textProps}>{children}</Text>
  )
}

export default Typo