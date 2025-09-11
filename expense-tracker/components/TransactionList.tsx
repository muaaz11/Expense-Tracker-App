import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { colors, radius } from "@/constant/style";
import { scale, verticalScale } from "@/utils/stying";
import { AppContext } from "@/context/store";
import { useFocusEffect } from "expo-router";

const TransactionList = () => {
  const { setTransactions, transactions } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("transactions:", transactions);
  }, []);

  return (
    <FlatList
      data={transactions}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{ paddingBottom: verticalScale(20) }}
      ListEmptyComponent={() => (
        <Text style={styles.emptyText}>No transactions yet</Text>
      )}
      renderItem={({ item }) => (
        <Pressable
          // onPress={() => onPressTransaction(item)} // for future update
          style={({ pressed }) => [
            styles.container,
            { opacity: pressed ? 0.7 : 1 },
          ]}
        >
          {/* Left side: Image + Type/Description */}
          <View style={styles.container2}>
            <View style={styles.image}>
              <Text style={{ color: "white" }}>Img</Text>
            </View>

            <View style={{ flexDirection: "column", gap: verticalScale(5) }}>
              <Text style={{ fontSize: scale(20), color: colors.neutral200 }}>
                {item.category}
              </Text>
              <Text style={{ fontSize: scale(12), color: colors.neutral400 }}>
                {item.description}
              </Text>
            </View>
          </View>

          {/* Right side: Amount + Date */}
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: scale(18), color: colors.neutral200 }}>
              ${item.amount}
            </Text>
            <Text style={{ fontSize: scale(12), color: colors.neutral400 }}>
              {item.date}
            </Text>
          </View>
        </Pressable>
      )}
    />

    // <View style={styles.container}>
    //   <FlatList
    //     data={transactions}
    //     keyExtractor={(item, index) => index.toString()}
    //     renderItem={({ item }) => (
    //       <View style={styles.item}>
    //         <Text style={styles.type}>{item.type}</Text>
    //         <Text style={styles.category}>{item.category}</Text>
    //         <Text style={styles.amount}>${item.amount}</Text>
    //         <Text style={styles.description}>{item.description}</Text>
    //       </View>
    //     )}
    //     ListEmptyComponent={() => (
    //       <Text style={styles.emptyText}>No transactions yet</Text>
    //     )}
    //   />
    // </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: verticalScale(10),
    backgroundColor: colors.neutral700,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(12),
    paddingHorizontal: verticalScale(10),
    borderRadius: radius._10,
  },
  container2: {
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
  emptyText: {
    textAlign: "center",
    marginTop: verticalScale(20),
    color: "#999",
  },
});
