import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import * as Icon from "phosphor-react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import { router, useRouter } from "expo-router";
import Header from "@/components/Header";
import { colors } from "@/constant/style";
import Button from "@/components/Button";
import Typo from "@/components/Typo";
import { AppContext } from "@/context/store";
import Input from "@/components/Input";
import { app_url } from "@/url";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import ImageUpload from "../../components/ImageUpload";
// import { uploadToCloudinary } from "@/services";

type WalletData = {
  id?: string;
  name: string;
  amount?: number;
  totalIncome?: number;
  totalExpense?: number;
  image?: any;
};

const WalletModal = () => {
  const [loading, setLoading] = useState(false);
  const [walletData, setWalletData] = useState<WalletData>({
    name: "",
    image: null as string | null,
  });

  const router = useRouter();

  const { user, user_Id, setUser } = useContext(AppContext);

  const handleImagePick = async () => {
    const permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissions.granted) {
      Alert.alert("Permission required");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      aspect: [2, 2],
    });
    if (!result.canceled) {
      const asset = result.assets[0];

      setWalletData((prev) => ({
        ...prev,
        image: asset.uri,
      }));
    }
  };

  const handleUpdate = async () => {
    const { name, image } = walletData;
    if (!name.trim() || !image) {
      Alert.alert("Error", "Name and Image are required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", walletData.name);

      if (walletData.image) {
        formData.append("image_url", {
          uri: walletData.image,
          type: "image/jpeg",
          name: "profile.jpg",
        } as any);
      }

      const response = await fetch(`${app_url}/updateUserData/${user_Id}`, {
        method: "PUT",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json();

      if (result.success) {
        setUser(result.data);

        Toast.show({
          type: "success",
          text1: "Successful",
          text2: "Profile updated",
        });

        router.navigate("/(tabs)/profile");
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Failed",
        text2: "Failed to update",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title="Add New Wallet" />
      </View>

      <View style={styles.formSection}>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Wallet Name</Text>
          <View>
            <Input
              placeholder="Enter Wallet Name"
              value={walletData.name}
              onChangeText={(value) =>
                setWalletData((prev) => ({ ...prev, name: value }))
              }
            />
          </View>
        </View>

        <View style={styles.WalletImageSection}>
          <Typo>Wallet Image</Typo>
          <ImageUpload
            file={walletData.image}
            placeHolder="upload Image"
            containerStyle={{ marginTop: 10 }}
            onSelect={(file) => setWalletData({ ...file, image: file })}
            onClear={() => setWalletData({ ...walletData, image: null })}
          />
        </View>

        <View style={styles.button}>
          <Button loading={loading} onPress={handleUpdate}>
            <Typo color={colors.neutral600} fontWeight={600}>
              Add Wallet
            </Typo>
          </Button>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default WalletModal;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.neutral900,
  },
  imageSection: {
    alignItems: "center",
    paddingVertical: 30,
  },
  imageWrapper: {
    position: "relative",
    marginBottom: 12,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.neutral100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.neutral100,
  },
  editImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#007AFF",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  changePhotoText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "500",
  },
  formSection: {
    paddingHorizontal: 20,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.neutral300,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.neutral800,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.neutral500,
    paddingHorizontal: 12,
  },
  fieldIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.neutral100,
    paddingVertical: 14,
  },

  WalletImageSection: {},

  button: {
    // alignItems: 'flex-end'
    justifyContent: "flex-start",
    marginTop: 100,
  },
});
