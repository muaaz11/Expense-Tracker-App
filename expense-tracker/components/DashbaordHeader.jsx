import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Typo from "./Typo";

const DashbaordHeader = () => {
  return (
    <View>
      <Typo size={15}>Hello</Typo>
      <Typo size={15}>Name{}</Typo>
    </View>
  );
};

export default DashbaordHeader;

const styles = StyleSheet.create({});
