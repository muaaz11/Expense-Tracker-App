import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors, spacingX, spacingY } from "@/constant/style";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Input from "./Input";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { verticalScale } from "@/utils/stying";
import BackButton from "./BackButton";
import Typo from "./Typo";

type Form = {
  close: () => void;
};

const ExpenseForm: React.FC<Form> = ({ close }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.neutral900,
        borderRadius: 10,
        margin: 10,
      }}
    >
      <View
        style={{
          //   borderBottomWidth: 1,
          //   marginTop: 50,
          flexDirection: "row",
          alignItems: "center",
          //   justifyContent: "",
        }}
      >
        <TouchableOpacity
          onPress={close}
          style={{
            padding: 5,
            backgroundColor: colors.neutral500,
            borderCurve: "continuous",
          }}
        >
          <MaterialCommunityIcons
            name="window-close"
            size={26}
            color={colors.neutral300}
          />
        </TouchableOpacity>

        <Typo
          style={{ textAlign: "center", marginHorizontal: 50 }}
          fontWeight={700}
          size={22}
        >
          Add Transaction
        </Typo>
      </View>

      <View
        style={{
          marginTop: 20,
          paddingHorizontal: spacingX._15,
          gap: 10,
        }}
      >
        <View style={{ gap: 10 }}>
          <Typo fontWeight={500} size={16}>
            Type
          </Typo>
          <Dropdown
            placeholder="Enter Price"
            icon={
              <FontAwesome6
                name="dollar-sign"
                size={18}
                color={colors.neutral300}
              />
            }
          />
        </View>

        <View style={{ gap: 10 }}>
          <Typo fontWeight={500} size={16}>
            Type
          </Typo>
          <Input
            placeholder="Enter Price"
            icon={
              <FontAwesome6
                name="dollar-sign"
                size={18}
                color={colors.neutral300}
              />
            }
          />
        </View>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({});
