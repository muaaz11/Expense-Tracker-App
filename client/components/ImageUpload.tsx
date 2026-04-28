import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  // Image
} from "react-native";
import React from "react";
import * as Icons from "phosphor-react-native";
import Typo from "./Typo";
import { colors, radius } from "@/constant/style";
import { scale, verticalScale } from "@/utils/stying";
import { Image } from "expo-image";
import { getFilePath } from "@/services";
import * as ImagePicker from "expo-image-picker";


type ImageUploadProps = {
  file?: any;
  placeHolder: string;
  containerStyle: ViewStyle;
  onSelect: (file: any) => void;
  onClear: () => void;
};

const ImageUpload = ({
  file = null,
  placeHolder = "",
  containerStyle,
  onSelect,
  onClear
}: ImageUploadProps) => {

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
        onSelect(result.assets[0])
      }
    }; 

  return (
    <View>
      {!file && (
        <TouchableOpacity
        onPress={handleImagePick}
          style={[styles.inputContainer, containerStyle && containerStyle]}
        >
          <Icons.UploadSimpleIcon size={20} color={colors.neutral100} />
          {placeHolder && <Typo>{placeHolder}</Typo>}
        </TouchableOpacity>
      )}

      {file && (
        <View style={styles.image}>
          <Image
            style={{ flex: 1 }}
            source={getFilePath(file)}
            contentFit="cover"
            transition={100}
          />

          <TouchableOpacity style={styles.deleteIcon} onPress={onClear}>
            <Icons.XIcon size={20} color={colors.neutral100} weight="fill" style={{borderRadius:radius._15}} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({
  inputContainer: {
    height: verticalScale(54),
    backgroundColor: colors.neutral700,
    borderRadius: radius._10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: colors.neutral500,
    borderStyle: "solid",
  },

  image: {
    height: verticalScale(150),
    width: verticalScale(150),
    borderRadius: radius._15,
    borderCurve: 'continuous',
    // padding:10,
    // backgroundColor:'red',
    marginTop:10,
    overflow: 'hidden'
  },

  deleteIcon: {
    position: 'absolute',
    top: scale(6),
    right: scale(6),
    shadowColor: colors.black,
    shadowOffset:{width:0,height: 5},
    shadowOpacity: 1,
    borderCurve: 'continuous',
    borderRadius: radius._20
  },
});
