import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { CustomButtonProps } from '@/types'
import { colors, radius } from '@/constant/style'
import { verticalScale } from '@/utils/stying'
import Loading from './Loading'

const Button = ({
    style,
    onPress,
    loading = false,
    children
}: CustomButtonProps) => {

    if(loading){
        <View style = {[styles.button, style, {backgroundColor: 'transparent'}]}>
            <Loading />
        </View>
    }
  return (
      <TouchableOpacity style={[style, styles.button]} onPress={onPress}>
        {children}
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
    button :{
        backgroundColor: colors.primary,
        borderRadius: radius._17,
        borderCurve: 'continuous',
        height: verticalScale(52),
        justifyContent: 'center',
        alignItems: 'center'
    }
})