import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
import Button from "@/components/Button";
import Typo from "@/components/Typo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import Header from "@/components/Header";
import { AppContext } from "@/context/store";
import { colors, radius, spacingX, spacingY } from "@/constant/style";
import { verticalScale } from "@/utils/stying";
import { Image } from "expo-image";
import { getProfileImage } from "@/services";
import * as Icons from "phosphor-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { accountOptionType } from "@/types";
import Toast from "react-native-toast-message";
import * as ImagePicker from 'expo-image-picker'

type AccountOptionsProps = {
  title?: string;
  icon?: ReactNode;
  bgColor?: string;
  routeName?: any;
};

export default function Profile() {
  const { user } = useContext(AppContext);
  const [loading, setLoading] = useState(false)
  const {image} = useLocalSearchParams()
  const router = useRouter()

  // console.log(user.name, "user name");
  

  // const logout = async () => {
  //   AsyncStorage.clear();
  //   router.replace("/Login");
  // };

  const userAccountOptions: AccountOptionsProps[] = [
    {
      title: "Edit Profile",
      icon: (
        <Icons.UserCheckIcon size={25} weight="fill" color={colors.neutral100} />
      ),
      bgColor: "#6366f1",
      routeName: "/(modals)/profileModal",
    },

    // {
    //   title: "Settings",
    //   icon: (
    //     <Icons.GearIcon size={25} weight="fill" color={colors.neutral100} />
    //   ),
    //   bgColor: "#00be4fff",
    //   routeName: "/(modals)/profileModal",
    // },

    // {
    //   title: "Privacy Policy",
    //   icon: <Icons.LockIcon size={25} weight="fill" color={colors.neutral100} />,
    //   bgColor: "#02ebf3ff",
    //   routeName: "/(modals)/profileModal",
    // },

    // {
    //   title: "Logout",
    //   icon: (
    //     <Icons.SignOutIcon
    //       size={25}
    //       weight="fill"
    //       color={colors.neutral100}
    //     />
    //   ),
    //   bgColor: "#fb5f5fff",
    //   // routeName: handleLogout()
    // },
  ];

    const handleLogout = async() => {
    try {
      setLoading(true);

      if (user) {
        await AsyncStorage.removeItem("userId");
        await AsyncStorage.removeItem("TOKEN");
        router.replace("/Login");
      } else {
        Toast.show({
          type:'error',
          text1: 'Error logging out'
        })
      }

      setLoading(false);
    } catch (error) {
      console.log("error in loggingout customer");
      Toast.show({
        type: 'error',
        text1: 'Server error'
      })
    }
  };

  const showLogoutAlert = () => {
    Alert.alert("Confirm", "Are you sure you want to logout?", [
{
      text: 'cancel',
      onPress: () => console.log("Cancel"),
      style: 'cancel'
    },

    {
      text: 'Logout',
      onPress: () => handleLogout(),
      style: 'destructive'
    }
    ])
  }
  const handlePress = (item: AccountOptionsProps) => {
    if(item.title === "Logout") {
      showLogoutAlert()
    } 

    if(item.routeName) router.push(item.routeName)
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title="Profile" />
      </View>

      <View style={styles.userInfo}>
        <View style={styles.avatarContent}>
          <Image
            source={getProfileImage(user?.image)}
            contentFit="cover"
            transition={100}
            style={styles.avatar}
          />

          {/* <TouchableOpacity style={styles.editIcon}>
            <Icons.PencilIcon
              size={verticalScale(20)}
              color={colors.neutral800}
            />
          </TouchableOpacity> */}
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

      <View style={styles.accountOptions}>
        {userAccountOptions.map((item, index) => {
          return (
            <Animated.View entering={FadeInDown.delay(index*40).springify().damping(14)} style={styles.listItem}>
            <TouchableOpacity
            onPress={() => handlePress(item)}
              style={{ flexDirection: "row", alignItems: "center", gap: spacingX._10}}
            >
              <View style={[styles.listIcon, {backgroundColor: item?.bgColor}]}>{item.icon && item.icon}</View>
              <Typo size={16} style={{flex:1, fontWeight: '500'}} >{item.title}</Typo>
              <Icons.CaretRightIcon size={verticalScale(20)} weight="bold" color={colors.neutral100} style={{marginRight: 10}}/>
            </TouchableOpacity>
          </Animated.View>
          )
        })}
      </View>
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

  editIcon: {
    position: "absolute",
    bottom: spacingY._5,
    right: spacingY._5,
    borderRadius: 100,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: spacingY._5,
  },

  accountOptions: {
    marginTop: spacingY._35,
  },

  listItem: {
    marginBottom: verticalScale(17),
    marginLeft: 15,
  },

  listIcon: {
    height: verticalScale(44),
    width: verticalScale(50),
    backgroundColor: colors.neutral200,
    borderRadius: radius._15,
    alignItems: "center",
    justifyContent: "center",
    borderCurve: "continuous",

  },

  listTitle: {
    
  },
});
