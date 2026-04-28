import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import * as Icons from "phosphor-react-native";
import Loading from "../Loading";
import { AppContext } from "@/context/store";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ActionsModal = ({ visible, closeModal, id, delTransaction }) => {
  const [loading, setLoading] = useState(false);



  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* <Text style={styles.title}>Select Action</Text> */}

          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Icons.XIcon size={18} />
          </TouchableOpacity>

          <View>
            <Text>Choose Options</Text>
          </View>

          <View style={styles.ActionsContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "red" }]}
              onPress={() => delTransaction(id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ActionsModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 250,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 12,
    alignItems: "center",
    elevation: 5,
    justifyContent: "center",
    gap: 10,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  ActionsContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
  },
  button: {
    width: 100,
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    // marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});
