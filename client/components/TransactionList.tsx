import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { colors, radius } from "@/constant/style";
import { scale, verticalScale } from "@/utils/stying";
import { AppContext } from "@/context/store";
import { useFocusEffect } from "expo-router";
import ActionsModal from "./Modal/ActionsModal";
import Toast from "react-native-toast-message";

const TransactionList = () => {
  const {
    setTransactions,
    transactions,
    setTotalBalance,
    setTotalIncome,
    setTotalExpense,
    user_Id
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [openActionModal, setOpenActionModal] = useState(false);
  const [transactionId, setTransactionId] = useState(null);

  // const transaction = transactions.map((item) => {
  //   return item.id;
  // });

  const handlePress = (item) => {
    setOpenActionModal(true);
    setTransactionId(item.id);
  };

  const deleteTransaction = async (id) => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://192.168.100.7:4000/deleteTransaction/${transactionId}`,
        {
          method: "DELETE",
        },
      );

      if (response.success) {
        Toast.show({
          type: "success",
          text1: "successful",
          text2: "Transaction deleted",
          autoHide: true,
        });
      }

      const updated = transactions.filter((item) => item.id !== id);
      setTransactions(updated);
      setOpenActionModal(false);

         const tranResponse = await fetch(
          `http://192.168.100.7:4000/balance/${user_Id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const result = await tranResponse.json();

        if (result.success) {
          const timeout = setTimeout(() => {
            setTotalBalance(Number(result.total_balance));
            setTotalIncome(Number(result.total_income));
            setTotalExpense(Number(result.total_expense));
          }, 2000);

          return () => clearTimeout(timeout)
        }

      setLoading(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to delete the transaction",
        autoHide: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <FlatList
        data={transactions}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: verticalScale(20) }}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No transactions yet</Text>
        )}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handlePress(item)}
            style={({ pressed }) => [
              styles.container,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            {/* Left side: Image + Type/Description */}
            <View style={styles.container2}>
              <View style={styles.image}>
                <Text style={{ color: "white" }}>{transactions.id}</Text>
              </View>

              <View style={{ flexDirection: "column", gap: verticalScale(5) }}>
                <Text style={{ fontSize: scale(20), color: colors.neutral200 }}>
                  {item.category_name ? `${item.category_name}` : "Income"}
                </Text>
                <Text style={{ fontSize: scale(12), color: colors.neutral400 }}>
                  {item.description}
                </Text>
              </View>
            </View>

            {/* Right side: Amount + Date */}
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: scale(18), color: colors.neutral200 }}>
                {item.amount}
              </Text>
              <Text style={{ fontSize: scale(12), color: colors.neutral400 }}>
                {item.date.split("T")[0]}
              </Text>
            </View>
          </Pressable>
        )}
      />

      <ActionsModal
        visible={openActionModal}
        closeModal={setOpenActionModal}
        id={transactionId}
        delTransaction={deleteTransaction}
      />
    </View>

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
