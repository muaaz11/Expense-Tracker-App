import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode, useContext } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Button from "@/components/Button";
import Typo from "@/components/Typo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Header from "@/components/Header";
import { AppContext } from "@/context/store";
import { colors, spacingY } from "@/constant/style";
import { verticalScale } from "@/utils/stying";
import { Image } from "expo-image";
import { getProfileImage } from "@/services";
import * as Icons from "phosphor-react-native";

type AccountOptionsProps = {
  title?: string;
  icon?: ReactNode;
  bgColor?: string;
  routeName?: any;
};

export default function Profile() {
  const { user } = useContext(AppContext);

  // const logout = async () => {
  //   AsyncStorage.clear();
  //   router.replace("/Login");
  // };

  const userAccountOptions: AccountOptionsProps[] = [
    {
      title: "Edit Profile",
      icon: <Icons.UserCheckIcon />,
      bgColor: '#6366f1',
      routeName: '/(modals)/profileModal'
    },
  ];

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title="Profile" />
      </View>

      <View style={styles.userInfo}>
        {/* User Infor */}

        <View style={styles.avatarContent}>
          <Image
            source={getProfileImage(user?.image)}
            contentFit="cover"
            transition={100}
            style={styles.avatar}
          />
        </View>

        <View style={{ alignItems: "center" }}>
          <Typo fontWeight={"600"} size={24} color={colors.neutral100}>
            {user?.name || "John"}
          </Typo>
          <Typo color={colors.neutral400} size={16}>
            {user?.email || "John11@gmail.com"}
          </Typo>
        </View>
      </View>

      <View></View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  userInfo: {
    alignItems: "center",
    gap: spacingY._15,
    marginTop: verticalScale(30),
  },

  avatarContent: {
    position: "relative",
    alignSelf: "center",
  },

  avatar: {
    alignSelf: "center",
    borderRadius: 200,
    backgroundColor: colors.neutral300,
    height: verticalScale(130),
    width: verticalScale(130),
  },
});
