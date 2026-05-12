import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { colors, radius } from "@/constant/style";
import { scale, verticalScale } from "@/utils/stying";
import { AppContext } from "@/context/store";
import {useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { expenseCategories, incomeCategory } from "@/constant/data";
import Typo from "./Typo";
import Loading from "./Loading";

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
  
  const router = useRouter()  
  
  const handlePress = (item) => {
    router.push({
      pathname: '/(modals)/addTransaction',
      params: {
        id: item?.id,
        type: item?.type,
        amount: item?.amount,
        category: item?.category_name,
        date: item.date,
        description: item?.description,
        wallet_id: item.wallet_id
      }
    })
  };

  // const deleteTransaction = async (id) => {
  //   try {
  //     setLoading(true);

  //     const response = await fetch(
  //       `http://192.168.100.7:4000/deleteTransaction/${transactionId}`,
  //       {
  //         method: "DELETE",
  //       },
  //     );

  //     if (response.success) {
  //       Toast.show({
  //         type: "success",
  //         text1: "successful",
  //         text2: "Transaction deleted",
  //         autoHide: true,
  //       });
  //     }

  //     const updated = transactions.filter((item) => item.id !== id);
  //     setTransactions(updated);
  //     setOpenActionModal(false);

  //        const tranResponse = await fetch(
  //         `http://192.168.100.7:4000/balance/${user_Id}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         },
  //       );

  //       const result = await tranResponse.json();

  //       if (result.success) {
  //         const timeout = setTimeout(() => {
  //           setTotalBalance(Number(result.total_balance));
  //           setTotalIncome(Number(result.total_income));
  //           setTotalExpense(Number(result.total_expense));
  //         }, 2000);

  //         return () => clearTimeout(timeout)
  //       }

  //     setLoading(false);
  //   } catch (error) {
  //     Toast.show({
  //       type: "error",
  //       text1: "Error",
  //       text2: "Failed to delete the transaction",
  //       autoHide: true,
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  
  const getCategoryInfo = (item: any) => {
    if (item.type === "income") {
      return {
        label: incomeCategory.label,
        icon: incomeCategory.icon,
        bgColor: incomeCategory.bgColor,
      };
    }

    return (
      (expenseCategories as any)[item.category_name] || expenseCategories.others
    );
  };

  return (
    <View>
      <View>
        {loading ? (
          <Loading size={50} color={colors.green} />
        ) : (
        <FlatList
        data={transactions}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingBottom: verticalScale(20) }}
        ListEmptyComponent={() => (
          <Typo style={styles.emptyText}>No transactions yet</Typo>
        )}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => handlePress(item)}
            style={({ pressed }) => [
              styles.container,
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <View style={styles.container2}>
              <View
                style={[
                  styles.image,
                  { backgroundColor: getCategoryInfo(item).bgColor },
                ]}
              >
                {(() => {
                  const CategoryIcon = getCategoryInfo(item).icon;
                  return <CategoryIcon size={20} color="white" />;
                })()}
              </View>

              <View style={{ flexDirection: "column", gap: verticalScale(5) }}>
                <Typo style={{ fontSize: scale(20), color: colors.neutral200 }}>
                  {getCategoryInfo(item).label}
                </Typo>
                <Typo style={{ fontSize: scale(12), color: colors.neutral400 }}>
                  {item.description}
                </Typo>
              </View>
            </View>

            <View style={{ alignItems: "center" }}>
                <Typo
                  style={{
                    fontSize: scale(18),
                    color: item.type === "income" ? colors.green : colors.rose,
                  }}
                >
                  {item.type === "expense" ? "-" : "+"}${item.amount}
                </Typo>
              <Typo style={{ fontSize: scale(12), color: colors.neutral400 }}>
                {item.date.split("T")[0]}
              </Typo>
            </View>
          </Pressable>
        )}
      />
      )}
      </View>

      {/* <ActionsModal
        visible={openActionModal}
        closeModal={setOpenActionModal}
        id={transactionId}
        delTransaction={deleteTransaction}
      /> */}
    </View>
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
