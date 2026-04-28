import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect } from "react";
import Typo from "./Typo";
import { scale, verticalScale } from "@/utils/stying";
import { colors } from "@/constant/style";
import { AppContext } from "@/context/store";
import AntDesign from "@expo/vector-icons/AntDesign";
const BalanceCard = () => {
  const { totalBalance, totalIncome, totalExpense } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <View>
        <Typo size={15} fontWeight={"400"} style={styles.text}>
          Total Balance
        </Typo>

        <Typo size={25} fontWeight={"600"} style={styles.balance}>
          {totalBalance !== undefined ? `${totalBalance}.00` : `$0.00`}
        </Typo>
      </View>

      <View style={styles.expenseIncome}>
        <View>
          {/* icon */}
          <Typo style={styles.income}>Income</Typo>
          <Typo style={styles.incomBal}>
            {totalIncome !== undefined ? `${totalIncome}.00` : "0.00"}
          </Typo>
        </View>

        <View>
          {/* icon */}
          <Typo style={styles.expense}>Expense</Typo>
          <Typo style={styles.expenseBal}>
            {totalExpense !== undefined ? `${totalExpense}.00` : "0.00"}
          </Typo>
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
