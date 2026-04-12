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
// import * as ImagePicker from 'react-native-image-picker'

const ProfileScreen = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    image: null,
  });

  const router = useRouter()

  const { user, user_Id, setUser } = useContext(AppContext);
  // console.log(user.name)

  //   const handleImagePick = () => {
  //     ImagePicker.launchImageLibrary({
  //       mediaType: 'photo',
  //       quality: 0.8,
  //       maxWidth: 500,
  //       maxHeight: 500,
  //     }, (response) => {
  //       if (response.didCancel) {
  //         console.log('User cancelled image picker')
  //       } else if (response.error) {
  //         Alert.alert('Error', 'Something went wrong')
  //       } else if (response.assets && response.assets[0]) {
  //         setImage(response.assets[0].uri)
  //       }
  //     })
  //   }

  useEffect(() => {
    setUserData({
      name: user?.name || "maaz",
      image: user?.image || null,
    });

    console.log(user)
  }, [user]);

  const handleUpdate = async () => {
    if (!userData.name.trim()) {
      Alert.alert("Error", "Please enter your name");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${app_url}/updateUserData/${user_Id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name: userData.name})
      });

      const result = await response.json()

      if (result.success) {
        if (result.data) {
          setUser(result.data);
          setUserData({ ...userData, name: result.data.name });
          router.navigate('/(tabs)/profile');
        }

        Toast.show({
          type: "success",
          text1: "Successfull",
          text2: "name update",
        });
      }
    } catch (error) {
        console.log("failed to update");
        Toast.show({
          type: 'error',
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
        <Header title="Update Profile" />
      </View>

      <View style={styles.imageSection}>
        <View style={styles.imageWrapper}>
          {userData.image ? (
            <Image
              source={{ uri: userData.image }}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Icon.PersonIcon size={60} color="#ccc" />
            </View>
          )}
          <TouchableOpacity
            style={styles.editImageButton}
            //   onPress={handleImagePick}
          >
            <Icon.CameraIcon size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.changePhotoText}>Change Profile Photo</Text>
      </View>

      <View style={styles.formSection}>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Full Name</Text>
          <View>
            <Input
              //   style={styles.input}
              placeholder="Enter your full name"
              //   placeholderTextColor={colors.neutral200}
              value={userData.name}
              onChangeText={(value) =>
                setUserData(prev => ({...prev, name:value}))
              }
            />
          </View>
        </View>

        <View>
          <Button loading={loading} onPress={handleUpdate}>
            <Typo>Update</Typo>
          </Button>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ProfileScreen;

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
});
