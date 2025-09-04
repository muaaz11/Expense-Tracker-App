import { colors } from "@/constant/style";
import { router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AppContext } from "@/context/store";

export default function Index() {
  const { user_Id } = useContext(AppContext);
  const [isNavigated, setIsNavigated] = useState(true);

  const NavigationBasedOnContext = () => {
    if (user_Id) {
      const timeoutId = setTimeout(() => {
        console.log("User found");
        router.navigate("/(tabs)/Home");
      }, 500);
      setIsNavigated(false);
      return () => clearTimeout(timeoutId);
    } else {
      const timeoutId = setTimeout(() => {
        console.log("User not found");
        router.navigate("/Login");
      }, 500);
      setIsNavigated(false);
      return () => clearTimeout(timeoutId);
    }
  };

  useEffect(() => {
    if (!isNavigated) {
      setIsNavigated(true);
    }
    NavigationBasedOnContext();
  }, [user_Id]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/welcome2.png")}
        resizeMode="contain"
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.neutral900,
  },

  image: {
    width: "70%",
    alignSelf: "center",
  },
});
