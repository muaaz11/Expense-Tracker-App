import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
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
import { FlashList } from "@shopify/flash-list";
import { AppContext } from "@/context/store";

const Home = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const { transactions } = useContext(AppContext);

  const handleClick = () => {}

  return (
    <ScreenWrapper>
      <ScrollView>
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

        <View >
          <Typo fontWeight={500} size={scale(16)} color={colors.neutral350}>
            Recent Transactions
          </Typo>

          <FlashList
            data={transactions}
            estimatedItemSize={60}
            renderItem={({ item, index }) => (
              <TransactionList item={item} handleClick={handleClick} index={index}/>
            )}
          />
        </View>

        <View style={{ position: "absolute", top: "90%", right: "6%" }}>
          <AddTransactionBtn onPress={() => setModalVisible(true)} />
        </View>

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Modal isVisible={isModalVisible} avoidKeyboard={false}>
            <ExpenseForm close={() => setModalVisible(false)} />
            <Toast topOffset={20} />
          </Modal>
        </View>
      </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
