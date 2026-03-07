import { Tabs } from "expo-router";
import { View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { AppProvider } from "@/context/store";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";
import { colors } from "@/constant/style";
import Toast from "react-native-toast-message";

export default function TabsLayout() {
  const [selected, setSelected] = useState(true);

  return (
    <AppProvider>
      <View style={{ flex: 1 }}>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: colors.primary,
            // tabBarInactiveTintColor: "gray",
            tabBarStyle: {
              height: 60,
              backgroundColor: colors.neutral800,
              borderTopWidth: 0,
              borderRightWidth: 0,
              elevation: 0,
            },
          }}
        >
          <Tabs.Screen
            name="Home"
            options={{
              tabBarLabel: "Home",
              tabBarIcon: ({ size, color, focused }) =>
                focused ? (
                  <MaterialCommunityIcons
                    name="home"
                    size={24}
                    color={colors.primary}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="home-outline"
                    size={24}
                    color="white"
                  />
                ),
            }}
          />
          <Tabs.Screen
            name="stats"
            options={{
              tabBarLabel: "statistics",
              tabBarIcon: ({ size, color, focused }) =>
                focused ? (
                  <Ionicons
                    name="stats-chart"
                    size={24}
                    color={colors.primary}
                  />
                ) : (
                  <Ionicons
                    name="stats-chart-outline"
                    size={24}
                    color="white"
                  />
                ),
            }}
          />

          <Tabs.Screen
            name="wallet"
            options={{
              tabBarLabel: "Wallet",
              tabBarIcon: ({ size, color, focused }) =>
                focused ? (
                  <Ionicons name="wallet" size={size} color={colors.primary} />
                ) : (
                  <Ionicons name="wallet-outline" size={size} color="white" />
                ),
            }}
          />

          <Tabs.Screen
            name="profile"
            options={{
              tabBarLabel: "Profile",
              tabBarIcon: ({ size, color, focused }) =>
                focused ? (
                  <FontAwesome5
                    name="user-alt"
                    size={24}
                    color={colors.primary}
                  />
                ) : (
                  <FontAwesome5 name="user" size={24} color="white" />
                ),
            }}
          />
        </Tabs>
      </View>
      <Toast />
    </AppProvider>
  );
}
