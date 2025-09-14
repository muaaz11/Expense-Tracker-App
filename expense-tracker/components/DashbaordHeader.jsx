import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext } from "react";
import Typo from "./Typo";
import { AppContext } from "@/context/store";

const DashbaordHeader = () => {
  const { user_id } = useContext(AppContext);

  return (
    <View>
      <Typo size={15}>Hello</Typo>
      <Typo size={15}>Name</Typo>
    </View>
  );
};

export default DashbaordHeader;

const styles = StyleSheet.create({});
