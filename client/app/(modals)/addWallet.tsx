import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import * as Icon from "phosphor-react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import Header from "@/components/Header";
import { colors } from "@/constant/style";
import Button from "@/components/Button";
import Typo from "@/components/Typo";
import { AppContext } from "@/context/store";
import Input from "@/components/Input";
import { app_url } from "@/url";
import Toast from "react-native-toast-message";
import ImageUpload from "../../components/ImageUpload";
import Loading from "@/components/Loading";

type WalletData = {
  id?: string;
  name: string;
  amount?: number;
  totalIncome?: number;
  totalExpense?: number;
  image?: any;
};

const WalletModal = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user_Id, setWallet, wallet } = useContext(AppContext);
  const [walletData, setWalletData] = useState<WalletData>({
    name: "",
    amount: 0,
    image: null as string | null,
  });

  const router = useRouter();
  const oldWallet: {
    wallet_id: string;
    name: string;
    amount: string;
    image: string;
  } = useLocalSearchParams();

  useEffect(() => {
    if (oldWallet.wallet_id) {
      setWalletData({
        name: oldWallet.name,
        amount: Number(oldWallet.amount),
        image: oldWallet.image,
      });
    }
  }, [oldWallet.wallet_id]);

  const onSubmit = async () => {
    if (!oldWallet.wallet_id) {
      const { name, image } = walletData;
      if (!name.trim() || !image) {
        Toast.show({
          type: "error",
          text1: "Failed",
          text2: "Wallet name and image are required",
        });
        return;
      }

      try {
        setIsSubmitting(true);

        const formData = new FormData();

        formData.append("wallet_name", walletData.name);
        formData.append("amount", walletData.amount?.toString() || "0");

        if (walletData.image) {
          formData.append("wallet_image", {
            uri: walletData.image.uri,
            type: "image/jpeg",
            name: "profile.jpg",
          } as any);
        }

        const response = await fetch(`${app_url}/addWallet/${user_Id}`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const result = await response.json();

        if (result.success) {
          Toast.show({
            type: "success",
            text1: "Successful",
            text2: "Wallet added successfully",
          });

          router.replace("/(tabs)/wallet");
        }

        setIsSubmitting(false);
      } catch (error) {
        console.log(error);
        Toast.show({
          type: "error",
          text1: "Failed",
          text2: "Failed to update",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      try {
        if (!walletData.name.trim() || !walletData.image) {
          Toast.show({
            type: "error",
            text1: "Failed",
            text2: "Wallet name and image are required",
          });
          return;
        }

        setIsSubmitting(true);

        const formData = new FormData();

        formData.append("wallet_name", walletData.name);
        formData.append("amount", walletData.amount?.toString() || "0");

        if (walletData.image) {
          if (walletData.image.uri) {
            formData.append("wallet_image", {
              uri: walletData.image.uri,
              type: "image/jpeg",
              name: "profile.jpg",
            } as any);
          } else if (typeof walletData.image === "string") {
            formData.append("wallet_image", walletData.image);
          }
        }

        const response = await fetch(
          `${app_url}/updateWallet/${oldWallet.wallet_id}`,
          {
            method: "PUT",
            body: formData,
          },
        );

        console.log("reached");
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const result = await response.json();
        console.log("Update response:", result);

        if (!result.success) {
          throw new Error(result.message || "Failed to update wallet");
        }

        Toast.show({
          type: "success",
          text1: "Successful",
          text2: "Wallet updated successfully",
        });

        router.replace("/(tabs)/wallet");
        setIsSubmitting(false);
      } catch (err:any) {
        console.log("Fetch error details:", err.message, err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const response = await fetch(
        `${app_url}/deleteWallet/${oldWallet.wallet_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const result = await response.json();

      if (!result.success) {
        console.log(result.message);
      }

      const updateWallets = wallet.filter(
        (prev:any) => prev.id !== oldWallet.wallet_id,
      );
      console.log(updateWallets);
      setWallet(updateWallets);

      router.navigate("/(tabs)/wallet");
      console.log("reached");

      setIsDeleting(false);
    } catch (error) {
      console.log("error deleting wallet", error);
      setIsDeleting(false);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header
          title={oldWallet.wallet_id ? "Update Wallet" : "Add New Wallet"}
        />
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

        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Initial Amount</Text>
          <View>
            <Input
              placeholder="Enter Initial Amount"
              value={walletData.amount?.toString() || ""}
              onChangeText={(value) =>
                setWalletData((prev) => ({
                  ...prev,
                  amount: parseFloat(value) || 0,
                }))
              }
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.WalletImageSection}>
          <Typo>Wallet Image</Typo>
          <ImageUpload
            file={walletData.image}
            placeHolder="upload Image"
            containerStyle={{ marginTop: 10 }}
            onSelect={(file) =>
              setWalletData((prev) => ({ ...prev, image: file }))
            }
            onClear={() => setWalletData({ ...walletData, image: null })}
          />
        </View>

        <View style={styles.button}>
          {oldWallet.wallet_id && (
            <Button
              style={{ backgroundColor: colors.rose, width: "15%" }}
              onPress={handleDelete}
            >
              {isDeleting ? (
                <Loading size={20} />
              ) : (
                <Icon.TrashIcon color={colors.neutral100} />
              )}
            </Button>
          )}
          <Button
            onPress={onSubmit}
            style={{
              backgroundColor: colors.primary,
              width: oldWallet.wallet_id ? "80%" : "100%",
            }}
          >
            {isSubmitting ? (
              <Loading color={colors.neutral800} />
            ) : (
              <Typo color={colors.neutral600} fontWeight={600}>
                {oldWallet.wallet_id ? "Update Wallet" : "Add Wallet"}
              </Typo>
            )}
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
    flexDirection: "row",
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
    justifyContent: "center",
    marginTop: 200,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
