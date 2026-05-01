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
import * as Icons from "phosphor-react-native";

const BalanceCard = () => {
  const { totalBalance, totalIncome, totalExpense } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <View>
        <Typo size={15} fontWeight={"400"} style={styles.text}>
          Total Balance
        </Typo>

        <Typo size={25} fontWeight={"bold"} style={styles.balance}>
          ${totalBalance !== undefined ? `${totalBalance}.00` : `$0.00`}
        </Typo>
      </View>

      <View style={styles.expenseIncome}>
        <View style={{ flexDirection: "row", alignItems: 'center' }}>
          {/* icon */}
          <View>
            <Typo style={styles.income}>Income</Typo>
            <Typo style={styles.incomBal}>
              {totalIncome !== undefined ? `${totalIncome}.00` : "0.00"}
            </Typo>
          </View>

          <View
            style={{
              backgroundColor: colors.neutral200,
              borderRadius: 50,
              padding: 8,
              justifyContent: "center",
              alignItems: "center",
              marginLeft: 10,
              width: 25,             
              height: 25,       
            }}
          >
            <Icons.ArrowUpIcon
              size={15}
              weight="bold"
              color={colors.green}
            />
          </View>
        </View>

        <View style={{ flexDirection: "row", alignItems: 'center'}}>
          <View>
            <Typo style={styles.expense}>Expense</Typo>
            <Typo style={styles.expenseBal}>
              {totalExpense !== undefined ? `${totalExpense}.00` : "0.00"}
            </Typo>
          </View>

          <View
            style={{
              backgroundColor: colors.neutral200,
              borderRadius: 50,    
              padding: 8,
              justifyContent: "center",
              alignItems: "center",  
              marginLeft: 10,       
              width: 25,             
              height: 25,            
            }}
          >
            <Icons.ArrowDownIcon
              size={15}
              weight="bold"  
              color={colors.rose}
            />
          </View>
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
    color: colors.black,
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
    // fontSize: 18
  },
});