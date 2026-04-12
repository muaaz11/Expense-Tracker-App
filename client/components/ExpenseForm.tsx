import {
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
import Input from "./Input";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { verticalScale } from "@/utils/stying";
import BackButton from "./BackButton";
import Typo from "./Typo";
import { Dropdown } from "react-native-element-dropdown";
import { TransactionType } from "@/types";
import DateTimePicker from "@react-native-community/datetimepicker";
import Button from "./Button";
import Toast from "react-native-toast-message";
import { router, useLocalSearchParams } from "expo-router";
import { AppContext } from "@/context/store";

type Form = {
  close: () => void;
};

const ExpenseForm: React.FC<Form> = ({ close }) => {
  const {
    user_Id,
    setTransactions,
    totalIncome,
    totalBalance,
    totalExpense,
    setTotalBalance,
    setTotalIncome,
    setTotalExpense,
  } = useContext(AppContext);

  const TransactionOptions = [
    { label: "expense", value: "expense" },
    { label: "income", value: "income" },
  ];

  const WalletType = [
    { label: "Job", value: "1" },
    { label: "Freelancing", value: "2" },
    { label: "Side Hustle", value: "3" },
  ];

  const ExpenseType = [
    { label: "Dinner", value: "dinner" },
    { label: "Medical", value: "medical" },
    { label: "Groceries", value: "groceries" },
  ];

  const [transaction, setTransaction] = useState<TransactionType>({
    type: "Expense",
    amount: 0,
    description: "",
    category_name: "",
    date: new Date(),
  });
  const [showDate, setShowDate] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [closeModal, setCloseModal] = useState(false);

  const onDateChange = (event: any, selectDate: any) => {
    const currentDate = selectDate || transaction.date;
    setTransaction({ ...transaction, date: currentDate });
    setShowDate(false);
  };

  const addTransaction = async () => {
    try {
      setLoading(true);

      const reponse = await fetch(
        `http://192.168.100.7:4000/add_transaction/${user_Id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: transaction.type,
            amount: transaction.amount,
            description: transaction.description || null,
            date: transaction.date.toISOString().slice(0, 10),
            category_name: transaction.category_name,
          }),
        },
      );

      const result = await reponse.json();

      if (result.success) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Transaction Added",
          autoHide: true,
        });

        // setTransactions(prev => [transaction, ...prev] )
        const transResponse = await fetch(
          `http://192.168.100.7:4000/getTransactions/${user_Id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const transResult = await transResponse.json();
        if (transResult.success) {
          setTransactions(transResult.transaction);
        }

        await setTransaction({
          type: "Expense",
          amount: 0,
          description: "",
          category_name: "",
          date: new Date(),
        });

        close();

        const response = await fetch(
          `http://192.168.100.7:4000/balance/${user_Id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        const result = await response.json();

        if (result.success) {
          const timeout = setTimeout(() => {
            setTotalBalance(Number(result.total_balance));
            setTotalIncome(Number(result.total_income));
            setTotalExpense(Number(result.total_expense));
          }, 2000);

          return () => clearTimeout(timeout)
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Failed to Add Transaction",
          text2: "There was an error adding the transaction. Please try again.",
          visibilityTime: 3000,
          autoHide: true,
        });
      }
    } catch (error) {
      console.log("Error during adding transaction", error);
      Toast.show({
        type: "error",
        text1: "Submission Error",
        text2:
          "Something went wrong while submitting the form. Please try again later.",
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
        borderRadius: 20,
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
          onPress={close}
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
          Add Transaction
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

          {/* Wallet Tye */}

          {/* <View style={{ gap: 10 }}>
            <Typo fontWeight={500} size={16}>
              Wallet Type
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
              data={WalletType}
              maxHeight={200}
              labelField="label"
              valueField="value"
              value={isWalletType}
              onChange={(item) => {
                setWalletType(item.value);
              }}
              renderItem={(item) => {
                const isSelected = item.value === isWalletType;
                return (
                  <View
                    style={{
                      marginHorizontal: 8, // spacing from dropdown edges
                      marginVertical: 4, // spacing between rows
                      padding: 10,
                      borderRadius: radius._17,
                      backgroundColor: isSelected
                        ? colors.neutral700
                        : "transparent",
                    }}
                  >
                    <Text
                      style={{
                        color: isSelected
                          ? colors.neutral100
                          : colors.neutral400,
                        fontWeight: isSelected ? "bold" : "normal",
                      }}
                    >
                      {item.label}
                    </Text>
                  </View>
                );
              }}
            />
          </View> */}

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
                data={ExpenseType}
                maxHeight={200}
                labelField="label"
                valueField="value"
                value={transaction.category_name}
                onChange={(item) => {
                  setTransaction({
                    ...transaction,
                    category_name: item.value,
                  });
                }}

                // renderItem={(item) => {
                //   const isSelected = item.value === isExpenseType;
                //   return (
                //     <View
                //       style={{
                //         marginHorizontal: 8, // spacing from dropdown edges
                //         marginVertical: 4, // spacing between rows
                //         padding: 10,
                //         borderRadius: radius._17,
                //         backgroundColor: isSelected
                //           ? colors.neutral700
                //           : "transparent",
                //       }}
                //     >
                //       <Text
                //         style={{
                //           color: isSelected
                //             ? colors.neutral100
                //             : colors.neutral400,
                //           fontWeight: isSelected ? "bold" : "normal",
                //         }}
                //       >
                //         {item.label}
                //       </Text>
                //     </View>
                //   );
                // }}
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
                  {(transaction.date as Date).toDateString()}
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

      <Button onPress={addTransaction} loading={isLoading}>
        <Typo size={20} color={colors.black} fontWeight={"500"}>
          Add Transaction
        </Typo>
      </Button>
    </View>
  );
};

export default ExpenseForm;

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
