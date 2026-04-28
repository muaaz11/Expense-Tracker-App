import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import { colors, radius, spacingX, spacingY } from "@/constant/style";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { scale, verticalScale } from "@/utils/stying";
import { AppContext } from "@/context/store";
import * as Icon from "phosphor-react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import Animated, { FadeInDown } from "react-native-reanimated";

const Wallet = () => {
  const { totalBalance, wallet } = useContext(AppContext);

  const getTotalBalance = (): number =>
    wallet.reduce((total: number, item: any) => {
      return total + Number(item.amount || 0);
    }, 0);

  return (
    <ScreenWrapper>
      <View>
        <View style={styles.balance}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Typo size={20} color={colors.neutral100}>
              $
            </Typo>
            <Typo size={40} color={colors.neutral100}>
              {getTotalBalance()}
            </Typo>
          </View>

          <Typo size={18} color={colors.neutral300}>
            Total Balance
          </Typo>
        </View>
<ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: verticalScale(40) }}
          >
        <View style={styles.flexRow}>
          <View style={styles.WalletHeader}>
            <Typo style={styles.walletText} size={24}>
              My Wallets
            </Typo>
            <TouchableOpacity
              style={styles.plusBtn}
              onPress={() => router.navigate("/(modals)/addWallet")}
            >
              <Icon.PlusIcon style={[styles.plusBtn]} />
            </TouchableOpacity>
          </View>

          
            <Animated.View
              style={styles.walletList}
              entering={FadeInDown.delay(100).damping(14).springify()}
            >
              {wallet.map((walletItem: any, id: number) => (
                <TouchableOpacity
                  style={styles.wallets}
                  key={id}
                  onPress={() =>
                    router.navigate({
                      pathname: "/(modals)/addWallet",
                      params: {
                        wallet_id: walletItem?.id,
                        name: walletItem?.wallet_name,
                        amount: walletItem?.amount,
                        image: walletItem.wallet_image,
                      },
                    })
                  }
                >
                  <View style={styles.NameContainer}>
                    <Image
                      source={walletItem.wallet_image}
                      style={styles.walletImage}
                      contentFit="cover"
                    />

                    <View>
                      <Typo style={styles.walletName}>
                        {walletItem.wallet_name}
                      </Typo>
                      <Typo
                        style={styles.amount}
                        size={14}
                        color={colors.neutral350}
                      >
                        $ {walletItem.amount || "0"}{" "}
                      </Typo>
                    </View>
                  </View>

                  <View>
                    <Icon.CaretRightIcon
                      color={colors.neutral200}
                      size={20}
                      style={{ marginRight: 10 }}
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </Animated.View>
        </View>
          </ScrollView>
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
    flex: 1,
    marginTop: verticalScale(80),
    backgroundColor: colors.neutral700,
    // height: "100%",
    margin: 10,
    borderRadius: 10,
  },

  WalletHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
  },

  walletText: {
    // margin: 15,
  },

  plusBtn: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(20),
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },

  walletsheader: {
    margin: 15,
  },

  walletList: {
    // height: verticalScale(20),
    gap: spacingY._15,
    paddingBottom: verticalScale(120),
    margin: spacingY._10,
  },

  wallets: {
    flexDirection: "row",
    // backgroundColor: 'black',
    alignItems: "center",
    gap: spacingX._10,
    justifyContent: "space-between",
  },

  walletImage: {
    height: verticalScale(50),
    width: verticalScale(50),
    borderRadius: radius._10,
  },

  NameContainer: {
    flexDirection: "row",
    gap: 10,
  },

  walletName: {
    fontFamily: "serif",
  },
  amount: {},
});
