import { ActivityIndicator, ActivityIndicatorProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '@/constant/style'

const Loading = ({
    size = "large",
    color = colors.primary
}: ActivityIndicatorProps) => {
    return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={size} color={color}/>
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({})