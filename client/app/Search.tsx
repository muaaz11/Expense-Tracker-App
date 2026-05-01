import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import React, { useContext, useState } from "react";
import ScreenWrapper from "@/components/ScreenWrapper";
// import Input from "@/components/Input";
import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import * as Icons from "phosphor-react-native";
import { colors, spacingX } from "@/constant/style";
import { verticalScale } from "@/utils/stying";
import { AppContext } from "@/context/store";
import Typo from "@/components/Typo";
import Loading from "@/components/Loading";
import TransactionList from "@/components/TransactionList";

const Search = () => {
  const [search, setSearch] = useState("");
  const { transactions } = useContext(AppContext);
  console.log(transactions);

  return (
    <ScreenWrapper>
      <View>
        <Header title="Search For Transactions" leftIcon={<BackButton />} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.searchInput}
          value={search}
          onChange={(value) => setSearch(value)}
        />
        <TouchableOpacity onPress={() => setSearch("")}>
          <Icons.XCircleIcon color={colors.neutral100} />
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        <TransactionList />
      </View>
    </ScreenWrapper>
  );
};

export default Search;

const styles = StyleSheet.create({
  inputContainer: {
    // height: verticalScale(50),
    // width: "100%",
    // backgroundColor: colors.neutral500,
    // justifyContent: 'center',
    // backgroundColor: colors.neutral100
    // paddingHorizontal: spacingX._20,
    margin: 20,
    flexDirection: "row",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.neutral100,
    alignItems: "center",
    padding: 5,
  },

  searchInput: {
    width: "90%",
    color: colors.neutral100,
    // borderWidth: 0
  },

  list: {
    marginHorizontal: spacingX._10
  }
});
