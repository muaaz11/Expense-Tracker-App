import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Typo from "./Typo";
import { scale, verticalScale } from "@/utils/stying";
import { colors } from "@/constant/style";

const BalanceCard = () => {
  return (
    <View style={styles.container}>
      <View>
        <Typo size={15} fontWeight={"400"} style={styles.text}>
          Total Balance
        </Typo>

        <Typo size={25} fontWeight={"600"} style={styles.balance}>
          $2156.00
        </Typo>
      </View>

      <View style={styles.expenseIncome}>
        <View>
          {/* icon */}
          <Typo style={styles.income}>Income</Typo>
          <Typo style={styles.incomBal}>$8000.00</Typo>
        </View>

        <View>
          {/* icon */}
          <Typo style={styles.expense}>Expense</Typo>
          <Typo style={styles.expenseBal}>$4500.00</Typo>
        </View>
      </View>
    </View>
  );
};

export default BalanceCard;

const styles = StyleSheet.create({
  container: {
    width: scale(320),
    height: scale(180),
    marginHorizontal: verticalScale(10),
    marginVertical: verticalScale(25),
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },

  text: {
    color: colors.black,
  },

  balance: {
    color: colors.primary,
  },

  expenseIncome: {
    marginVertical: verticalScale(40),
    flexDirection: "row",
    justifyContent: "space-between",
  },

  income: {
    color: colors.neutral600,
    fontWeight: 600,
  },

  incomBal: {
    color: colors.green,
    fontWeight: "800",
  },

  expense: {
    color: colors.neutral600,
    fontWeight: 600,
  },

  expenseBal: {
    color: colors.rose,
    fontWeight: "800",
  },
});
