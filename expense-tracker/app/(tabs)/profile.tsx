import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Button from "@/components/Button";
import Typo from "@/components/Typo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function Profile() {
  const logout = async () => {
    AsyncStorage.clear();
    router.replace("/Login");
  };

  return (
    <ScreenWrapper>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button onPress={logout}>
          <Typo>Logout</Typo>
        </Button>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({});
