import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors, radius } from "@/constant/style";
import { scale, verticalScale } from "@/utils/stying";

const TransactionList = () => {
  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <View style={styles.image}>
          <Text>Image</Text>
        </View>

        <View style={{ flexDirection: "column", gap: 5 }}>
          <Text style={{ fontSize: scale(20), color: colors.neutral200 }}>
            salary
          </Text>
          <Text style={{ fontSize: scale(12), color: colors.neutral400 }}>
            Description...
          </Text>
        </View>
      </View>

      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: scale(18), color: colors.neutral200 }}>
          $200
        </Text>
        <Text style={{ fontSize: scale(12), color: colors.neutral400 }}>
          4 sep
        </Text>
      </View>
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: verticalScale(10),
    backgroundColor: colors.neutral700,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: verticalScale(10),
    borderRadius: radius._10,
  },

  container2: {
    flexDirection: "row",
    gap: verticalScale(20),
    alignItems: "center",
  },

  image: {
    backgroundColor: colors.green,
    padding: verticalScale(10),
    borderRadius: radius._10,
  },
});
