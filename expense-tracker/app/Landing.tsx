import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { use, useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/store.js";
import { colors } from "@/constant/style";
import DashboardHeader from "@/components/DashbaordHeader";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { verticalScale } from "@/utils/stying";
import BalanceCard from "@/components/BalanceCard";

const Landing = () => {
  const { user_Id, user } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  if (!user_Id) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={"green"} />
      </View>
    );
  }

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
      </View>
    </ScreenWrapper>
  );
};

export default Landing;

const styles = StyleSheet.create({});
