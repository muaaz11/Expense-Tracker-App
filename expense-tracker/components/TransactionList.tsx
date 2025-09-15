import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { colors, radius } from "@/constant/style";
import { scale, verticalScale } from "@/utils/stying";
import { AppContext } from "@/context/store";
import { useFocusEffect } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import Animated, { FadeInDown } from "react-native-reanimated";

type TransactionItem = {
  handleClick:  () => void;
}

const TransactionList = () => {
  const { setTransactions, transactions } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  return (

    <Animated.View
    entering={FadeInDown.delay(100).duration(300)}
    >
      <View> 
        <Pressable
        style={({ pressed }) => [
          styles.container,
          // { opacity: pressed ? 0.7 : 1 },
        ]}
      >
        {/* Left side: Image + Category/Description */}
        <View style={styles.leftSection}>
          <View style={styles.image}>
            <Text style={{ color: "white" }}>Img</Text>
          </View>

          <View style={{ flexDirection: "column", gap: verticalScale(5) }}>
            <Text style={styles.categoryText}>
              {transactions.category_name || "Income"}
            </Text>
            <Text style={styles.descText}>{transactions.description || "Groceries"}</Text>
          </View>
        </View>

        {/* Right side: Amount + Date */}
        <View style={{ alignItems: "center" }}>
          <Text style={styles.amountText}>${transactions.amount}</Text>
          <Text style={styles.dateText}>
            {transactions.date}
          </Text>
        </View>
      </Pressable></View>
    </Animated.View>



  );
}
export default TransactionList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: verticalScale(8),
    backgroundColor: colors.neutral700,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(12),
    paddingHorizontal: verticalScale(10),
    borderRadius: radius._10,
  },
  leftSection: {
    flexDirection: "row",
    gap: verticalScale(20),
    alignItems: "center",
  },
  image: {
    backgroundColor: colors.green,
    padding: verticalScale(10),
    borderRadius: radius._10,
    justifyContent: "center",
    alignItems: "center",
    minWidth: scale(50),
    minHeight: scale(50),
  },
  categoryText: {
    fontSize: scale(20),
    color: colors.neutral200,
  },
  descText: {
    fontSize: scale(12),
    color: colors.neutral400,
  },
  amountText: {
    fontSize: scale(18),
    color: colors.neutral200,
  },
  dateText: {
    fontSize: scale(12),
    color: colors.neutral400,
  },
  emptyText: {
    textAlign: "center",
    marginTop: verticalScale(20),
    color: "#999",
  },
});


