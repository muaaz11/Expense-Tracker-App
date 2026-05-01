import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { colors, radius, spacingX, spacingY } from "@/constant/style";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Input from "../../components/Input";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { verticalScale } from "@/utils/stying";
import BackButton from "../../components/BackButton";
import Typo from "../../components/Typo";
import { Dropdown } from "react-native-element-dropdown";
import { TransactionType } from "@/types";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "../../components/Button";
import Toast from "react-native-toast-message";
import { router, useLocalSearchParams } from "expo-router";
import { AppContext } from "@/context/store";
import Loading from "@/components/Loading";
import { Image } from "expo-image";
import { expenseCategories } from "@/constant/data";
import { Timestamp } from "react-native-reanimated/lib/typescript/commonTypes";
import { app_url } from "@/url";

const AddTransaction: React.FC = () => {
  const {
    user_Id,
    setTransactions,
    setTotalBalance,
    setTotalIncome,
    setTotalExpense,
    transactions,
    fetchWallets,
    wallet,
  } = useContext(AppContext);

  const TransactionOptions = [
    { label: "expense", value: "expense" },
    { label: "income", value: "income" },
  ];
  const [transaction, setTransaction] = useState<TransactionType>({
    type: "Expense",
    amount: 0,
    description: "",
    category_name: "",
    date: new Date(),
    id: "",
  });
  const [showDate, setShowDate] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const oldTransaction = useLocalSearchParams() as any;

  useEffect(() => {
    if (oldTransaction?.id) {
      setTransaction({
        type: oldTransaction.type,
        amount: Number(oldTransaction.amount),
        category_name: oldTransaction.category,
        date: oldTransaction.date ? new Date(oldTransaction.date) : new Date(),
        description: oldTransaction.description,
      });
      if (oldTransaction.wallet_id) {
        const walletId = String(oldTransaction.wallet_id);
        setSelectedId(walletId);
      }
    }
  }, [oldTransaction.id, oldTransaction.wallet_id]);

  const onDateChange = (event: any, selectDate: any) => {
    const currentDate = selectDate || transaction.date;
    setTransaction({ ...transaction, date: currentDate });
    setShowDate(false);
  };


const handleAddOrUpdateTransaction = async () => {
  if (!transaction.type || !transaction.amount || !selectedId) {
    Alert.alert("Please fill the required fields");
    return;
  }

  const isUpdate = !!oldTransaction?.id;

  try {
    setLoading(true);

    const endpoint = isUpdate
      ? `${app_url}/updateTransaction/${oldTransaction.id}/${user_Id}`
      : `${app_url}/add_transaction/${user_Id}`;

    const response = await fetch(endpoint, {
      method: isUpdate ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: transaction.type,
        wallet_id: selectedId,
        amount: transaction.amount,
        description: transaction.description || null,
        date: transaction.date.toISOString().slice(0, 10),
        category_name: transaction.category_name,
      }),
    });

    const result = await response.json();
    console.log("API result:", JSON.stringify(result)); // 👈 check this

    if (result.success) {
      if (isUpdate) {
        const updatedItem = {
          id: Number(oldTransaction.id),       
          type: transaction.type,
          amount: transaction.amount,
          description: transaction.description,
          category_name: transaction.category_name,
          date: transaction.date.toISOString().slice(0, 10),
          wallet_id: selectedId,
          ...(result.transaction ?? {}),        
        };

        setTransactions((prev: any) =>
          prev.map((t: any) =>
            Number(t.id) === Number(oldTransaction.id) ? updatedItem : t 
          )
        );
        const oldAmount = Number(oldTransaction.amount);
        const newAmount = Number(transaction.amount);
        const diff = newAmount - oldAmount;

        if (transaction.type === "expense") {
          setTotalBalance((prev: any) => prev - diff);
          setTotalExpense((prev: any) => prev + diff);
        } else {
          setTotalBalance((prev: any) => prev + diff);
          setTotalIncome((prev: any) => prev + diff);
        }

      } else {
        setTransactions((prev: any) => [result.transaction, ...prev]);

        if (transaction.type === "expense") {
          setTotalBalance((prev: any) => prev - Number(transaction.amount));
          setTotalExpense((prev: any) => prev + Number(transaction.amount));
        } else {
          setTotalBalance((prev: any) => prev + Number(transaction.amount));
          setTotalIncome((prev: any) => prev + Number(transaction.amount));
        }
      }

      Toast.show({
        type: "success",
        text1: "Success",
        text2: `Transaction ${isUpdate ? "Updated" : "Added"}`,
        autoHide: true,
      });

      router.replace('/(tabs)/Home');

    } else {
      Toast.show({
        type: "error",
        text1: "Failed",
        text2: result.message || "Something went wrong.",
        visibilityTime: 3000,
        autoHide: true,
      });
    }
  } catch (error) {
    console.log("Error:", error);
    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Something went wrong. Please try again.",
      visibilityTime: 3000,
      autoHide: true,
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.neutral700,
        // borderRadius: 20,
        paddingBottom: 20,
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 12,
          borderBottomWidth: 1,
          borderColor: colors.neutral600,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            padding: 6,
            backgroundColor: colors.neutral500,
            borderRadius: radius._17,
          }}
        >
          <MaterialCommunityIcons
            name="window-close"
            size={24}
            color={colors.neutral300}
          />
        </TouchableOpacity>

        <Typo
          style={{ flex: 1, textAlign: "center" }}
          fontWeight={700}
          size={20}
        >
          {oldTransaction?.id ? "Update Transaction" : "Add Transaction"}
        </Typo>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 30 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingVertical: 20, gap: 20 }}>
          {/* Transaction Type */}

          <View style={{ gap: 10 }}>
            <Typo fontWeight={500} size={16}>
              Type
            </Typo>
            <Dropdown
              style={styles.dropdown}
              containerStyle={styles.dropdownContainer}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              activeColor="transparent"
              itemTextStyle={{ color: colors.neutral400 }}
              closeModalWhenSelectedItem={true}
              data={TransactionOptions}
              maxHeight={200}
              labelField="label"
              valueField="value"
              value={transaction.type}
              onChange={(item) => {
                setTransaction({ ...transaction, type: item.value });
              }}
            />
          </View>

          {/* {All Wallets} */}

          <View style={{ gap: 10 }}>
            <Typo fontWeight={500} size={16}>
              Wallets
            </Typo>
            <Dropdown
              style={styles.dropdown}
              containerStyle={styles.dropdownContainer}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              iconStyle={styles.iconStyle}
              activeColor="transparent"
              itemTextStyle={{ color: colors.neutral400 }}
              closeModalWhenSelectedItem={true}
              data={wallet.map((w) => ({
                label: `${w.wallet_name} $(${w.amount})`,
                value: String(w.id),
                image: w.wallet_image,
              }))}
              maxHeight={200}
              labelField="label"
              valueField="value"
              value={selectedId}
              onChange={(item) => {
                setSelectedId(item.value);
                setTransaction({ ...transaction, id: item.value });
              }}
              renderItem={(item) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 10,
                    gap: 10,
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 35, height: 35, borderRadius: 8 }}
                  />
                  <View>
                    <Typo size={14} color={colors.white}>
                      {item.label}
                    </Typo>
                  </View>
                </View>
              )}
            />
          </View>

          {/* Expense category */}

          {transaction.type == "expense" && (
            <View style={{ gap: 10 }}>
              <Typo fontWeight={500} size={16}>
                Expense Category
              </Typo>
              <Dropdown
                style={styles.dropdown}
                containerStyle={styles.dropdownContainer}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                activeColor="transparent"
                itemTextStyle={{ color: colors.neutral400 }}
                closeModalWhenSelectedItem={true}
                data={Object.values(expenseCategories)}
                maxHeight={200}
                labelField="label"
                valueField="value"
                value={transaction.category_name}
                onChange={(item) => {
                  setTransaction({ ...transaction, category_name: item.value });
                }}
                renderItem={(item) => (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 10,
                      gap: 10,
                    }}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={{ width: 35, height: 35, borderRadius: 8 }}
                    />
                    <View>
                      <Typo size={14} color={colors.white}>
                        {item.label}
                      </Typo>
                    </View>
                  </View>
                )}
              />
            </View>
          )}

          {/* Date:? */}

          <View style={{ gap: 10 }}>
            <Typo fontWeight={500} size={16}>
              Date
            </Typo>

            {!showDate && (
              <Pressable
                style={styles.dateInput}
                onPress={() => setShowDate(true)}
              >
                <Typo size={16}>
                  {new Date(transaction.date).toDateString()}
                </Typo>
              </Pressable>
            )}

            {showDate && (
              <DateTimePicker
                themeVariant="dark"
                value={transaction.date as Date}
                textColor={colors.white}
                mode="date"
                display={Platform.OS == "ios" ? "spinner" : "default"}
                onChange={onDateChange}
              />
            )}
          </View>

          {/* Amount */}

          <View style={{ gap: 10 }}>
            <Typo fontWeight={500} size={16}>
              Amount
            </Typo>

            <Input
              keyboardType="phone-pad"
              value={transaction.amount?.toString()}
              onChangeText={(value) =>
                setTransaction({
                  ...transaction,
                  amount: Number(value.replace(/[^0-9]/g, "")),
                })
              }
            />
          </View>

          {/* Description */}

          <View style={{ gap: 10 }}>
            <Typo fontWeight={500} size={16}>
              Description
            </Typo>

            <Input
              keyboardType="default"
              value={transaction.description}
              multiline
              containerStyle={{
                flexDirection: "row",
                height: verticalScale(100),
                alignItems: "flex-start",
                // paddingVertical: 10,
              }}
              onChangeText={(value) =>
                setTransaction({
                  ...transaction,
                  description: value,
                })
              }
            />
          </View>
        </View>
      </ScrollView>

      {/* Button */}

      {isLoading ? (
        <Loading />
      ) : (
        <Button
          onPress={handleAddOrUpdateTransaction}
          loading={isLoading}
          style={{ backgroundColor: colors.primary }}
        >
          <Typo size={20} color={colors.black} fontWeight={"500"}>
            {oldTransaction?.id ? "Update Transaction" : "Add Transaction"}
          </Typo>
        </Button>
      )}

      <Toast />
    </View>
  );
};

export default AddTransaction;

const styles = StyleSheet.create({
  dropdown: {
    height: verticalScale(64),
    backgroundColor: colors.neutral700,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: radius._17,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._15,
    // gap: spacingX._10,
  },
  dropdownContainer: {
    backgroundColor: colors.neutral800,
    borderRadius: radius._17,
  },
  icon: {
    // marginRight: 5,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.rose,
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    // backgroundColor: colors.rose,
  },
  placeholderStyle: {
    fontSize: 16,
    color: colors.white,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: colors.white,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  dateInput: {
    height: verticalScale(64),
    backgroundColor: colors.neutral700,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: radius._17,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._15,
  },
});
