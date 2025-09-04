import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { verticalScale } from "@/utils/stying";
import { colors, radius } from "@/constant/style";

const AddTransactionBtn = ({ open }) => {
  return (
    <TouchableOpacity
      style={{
        padding: verticalScale(15),
        backgroundColor: colors.primary,
        borderRadius: "100%",
      }}
    >
      <FontAwesome6 name="plus" size={25} color={colors.neutral700} />
    </TouchableOpacity>
  );
};

export default AddTransactionBtn;

const styles = StyleSheet.create({});
