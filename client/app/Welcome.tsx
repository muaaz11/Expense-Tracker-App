import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constant/style'
import { verticalScale } from '@/utils/stying'
import Button from '@/components/Button'
import Animated, { FadeIn, FadeInDown, FadeInLeft } from 'react-native-reanimated'
import { router } from 'expo-router'

export default function Welcome() {
    return (
        <ScreenWrapper>
            <View style={styles.container}>

                <View>
                    <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/Login')}>
                        <Typo fontWeight={'500'}>
                            Sign in
                        </Typo>
                    </TouchableOpacity>

                    <Animated.Image
                        entering={FadeIn.duration(1000)}
                        source={require('../assets/images/welcom2.png')}
                        style={styles.welcomImage}
                        resizeMode='contain'
                    />

                </View>

                <View style={styles.footer}>
                    <Animated.View
                     entering={FadeInLeft.duration(1500).springify()}
                    style={{ alignItems: 'center' }}>
                        <Typo size={30} fontWeight={'800'}>
                            Always take control
                        </Typo>
                        <Typo size={30} fontWeight={'800'}>
                            of your finances
                        </Typo>
                    </Animated.View>

                    <Animated.View 
                    entering={FadeInDown.duration(1500).delay(500).springify()}
                    style={{ alignItems: 'center', gap: 2 }}>
                        <Typo size={17} color={colors.textLighter}>
                            Finance must be arranged to set a better
                        </Typo>
                        <Typo size={17} color={colors.textLighter}>
                            lifestyle in future
                        </Typo>
                    </Animated.View>

                    <View style={styles.bottonContiiner}>
                        <Button onPress={() => router.push('/Register')}>
                            <Typo size={20} color={colors.neutral900} fontWeight={'600'}>
                                Get Started
                            </Typo>
                        </Button>
                    </View>

                </View>
            </View>
        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: spacingY._7
    },
    loginButton: {
        alignSelf: 'flex-end',
        marginRight: spacingX._20
    },

    welcomImage: {
        width: '100%',
        height: verticalScale(300),
        // alignSelf: 'center',
        alignItems: 'center',
        marginTop: verticalScale(100)
    },

    footer: {
        backgroundColor: colors.neutral800,
        alignItems: 'center',
        paddingTop: verticalScale(30),
        paddingBottom: verticalScale(45),
        gap: spacingY._20,
        shadowColor: 'white',
        shadowOffset: { width: 10, height: -10 },
        elevation: 10,
        shadowRadius: 25,
        shadowOpacity: 0.15
    },

    bottonContiiner: {
        width: '100%',
        paddingHorizontal: spacingX._40
    },

})