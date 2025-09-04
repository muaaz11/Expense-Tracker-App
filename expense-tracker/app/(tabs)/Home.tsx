import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Typo from "@/components/Typo";
import BalanceCard from "@/components/BalanceCard";
import ScreenWrapper from "@/components/ScreenWrapper";
import { scale, verticalScale } from "@/utils/stying";
import TransactionList from "@/components/TransactionList";
import AddTransactionBtn from "@/components/AddTransactionBtn";
import { colors } from "@/constant/style";

const Home = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    if (open) {
    }
  };
  return (
    <ScreenWrapper>
      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
          paddingHorizontal: verticalScale(20),
        }}
      >
        <View>
          <Typo size={15} fontWeight={"300"}>
            Hello
          </Typo>
          <Typo size={25} fontWeight={"600"}>
            Maaz Memon
          </Typo>
        </View>

        <View>
          <BalanceCard />
        </View>

        <View>
          <Typo fontWeight={500} size={scale(16)} color={colors.neutral350}>
            Recent Transactions
          </Typo>

          <TransactionList />
        </View>

        <View style={{ position: "absolute", top: "90%", right: "6%" }}>
          <AddTransactionBtn open={open} />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
