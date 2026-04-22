import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { colors } from "@/constant/style";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { scale, verticalScale } from "@/utils/stying";
import { AppContext } from "@/context/store";
import * as Icon from "phosphor-react-native";
import { router } from "expo-router";

const Wallet = () => {
  const { totalBalance } = useContext(AppContext);

  const getTotalBalance = () => {
    return totalBalance;
  };

  return (
    <ScreenWrapper>
      <View>
        <View style={styles.balance}>
          <Typo size={40} color={colors.neutral100}>
            {totalBalance.toFixed(2) || "0"}
          </Typo>
          <Typo size={18} color={colors.neutral300}>
            Total Balance
          </Typo>
        </View>

        <View style={styles.flexRow}>
          <View style={styles.WalletHeader}>
            <Typo style={styles.walletText} size={24}>
              Wallets
            </Typo>
            <TouchableOpacity onPress={() => router.navigate('/(modals)/addWallet')}>
              <Icon.PlusIcon style={styles.plusIcon} size={24}/>
            </TouchableOpacity>
          </View>

          <View>
            <Typo>
              All Wallets
            </Typo>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  balance: {
    // justifyContent:'center',
    alignItems: "center",
    marginTop: verticalScale(30),
  },

  flexRow: {
    marginTop: verticalScale(80),
    backgroundColor: colors.neutral700,
    height: "100%",
    margin: 10,
    borderRadius: 10,
  },

  WalletHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 20
  }, 

  walletText: {
    // margin: 15,
  },

  plusIcon: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    padding: 12
  },
});
