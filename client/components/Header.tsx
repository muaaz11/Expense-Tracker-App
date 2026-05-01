import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import Typo from "./Typo";

type HeaderProps = {
  leftIcon?: ReactNode;
  title?: string;
};

const Header: React.FC<HeaderProps> = ({ leftIcon, title }) => {
  return (
    <View style={styles.container}>
      {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
      {title && (
        <Typo
          fontWeight={"600"}
          size={20}
          style={{
            textAlign: "center",
            width: leftIcon ? "80%" : "100%",
          }}
        >
          {title}
        </Typo>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },

  leftIcon: {},
});

export default Header;
