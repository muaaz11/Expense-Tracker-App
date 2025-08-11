import { colors } from "@/constant/style";
import { router } from "expo-router";
import { useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

export default function Index() {

  useEffect(() => {
    setTimeout(() => {
      router.push('/Welcome')
    }, 2000)
  }, [])

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/welcome2.png")}
        resizeMode='contain'
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.neutral900
  },

  image: {
    width: '70%',
    alignSelf: 'center'
  }
})