import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { BackButtonProps } from '@/types'
import { router } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { verticalScale } from '@/utils/stying';
import { colors, radius, spacingX, spacingY } from '@/constant/style';

const BackButton = ({
    style,
    iconSize = 24
}: BackButtonProps) => {
    return (

        <View style={styles.container}>
            <TouchableOpacity style={[styles.button, style]} onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={verticalScale(iconSize)} color={colors.white} />
            </TouchableOpacity>
        </View>

    )
}

export default BackButton

const styles = StyleSheet.create({

    container: {
        borderBottomColor: colors.neutral800,
        width: '100%',
        borderBottomWidth: 1,
        paddingVertical: spacingY._10
    },

    button: {
        backgroundColor: colors.neutral500,
        alignSelf: 'flex-start',
        borderRadius: radius._12,
        borderCurve: 'continuous',
        padding: 3,
        // marginVertical: spacingY._5
    }
})