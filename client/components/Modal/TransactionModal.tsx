import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import Modal, { ModalProps } from "react-native-modal";

type TransactionModal = ModalProps & {
  visible: boolean;
  input: boolean;
};

const TransactionModal: React.FC<TransactionModal> = ({
  visible,
  input,
  children,
  ...rest
}) => {
  const content = input ? (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {children}
    </KeyboardAvoidingView>
  ) : (
    <View>{children}</View>
  );

  return <Modal {...rest}>{content}</Modal>;
};

export default TransactionModal;

const styles = StyleSheet.create({});
