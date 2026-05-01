import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Alert,
  BackHandler,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Typo from "@/components/Typo";
import BalanceCard from "@/components/BalanceCard";
import ScreenWrapper from "@/components/ScreenWrapper";
import { scale, verticalScale } from "@/utils/stying";
import TransactionList from "@/components/TransactionList";
import AddTransactionBtn from "@/components/AddTransactionBtn";
import { colors } from "@/constant/style";
import TransactionModal from "@/components/Modal/TransactionModal";
import ExpenseForm from "@/components/ExpenseForm";
import Modal from "react-native-modal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { AppContext } from "@/context/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Loading from "@/components/Loading";
import * as Icons from "phosphor-react-native";


const Home = () => {
  const { user } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);

      if (user) {
        await AsyncStorage.removeItem("userId");
        await AsyncStorage.removeItem("TOKEN");
        router.replace("/Login");
      } else {
        Toast.show({
          type: "error",
          text1: "Error logging out",
        });
      }

      setLoading(false);
    } catch (error) {
      console.log("error in loggingout customer");
      Toast.show({
        type: "error",
        text1: "Server error",
      });
    }
  };

  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert('Hold on!', 'Are you sure you want to go back?', [
  //       {
  //         text: 'Cancel',
  //         onPress: () => null,
  //         style: 'cancel',
  //       },
  //       {text: 'YES', onPress: () => BackHandler.exitApp()},
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, []);

  return (
    <ScreenWrapper>
      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          paddingHorizontal: verticalScale(20),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: verticalScale(15),
          }}
        >
          <View>
            <Typo size={14} fontWeight={"300"} color={colors.neutral400}>
              Hello
            </Typo>

            <Typo size={24} fontWeight={"600"}>
              {user?.name}
            </Typo>
          </View>

          <Pressable
            onPress={() => router.navigate('/Search')}
            style={{
              // paddingVertical: verticalScale(6),
              // paddingHorizontal: scale(14),
              backgroundColor: colors.neutral800,
              padding: verticalScale(10),
              borderRadius: 8,
            }}
          >
            <Icons.MagnifyingGlassIcon color={colors.neutral350} size={20}/>
          </Pressable>
        </View>

        <View>
          <BalanceCard />
        </View>

        <ScrollView
          contentContainerStyle={{ paddingBottom: verticalScale(40) }}
        >
          <Typo fontWeight={500} size={scale(16)} color={colors.neutral350}>
            Recent Transactions
          </Typo>

          <TransactionList />
        </ScrollView>

        <View style={{ position: "absolute", top: "90%", right: "6%" }}>
          <AddTransactionBtn onPress={() => router.push('/(modals)/addTransaction')} />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
