import React from "react";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";

const CustomButton = ({
  onPress,
  title,
  mode = "contained",
  style,
  width,
  height,
  ...props
}) => {
  return (
    <Button
      mode={mode}
      onPress={onPress}
      style={[styles.button, { width, height }, style]}
      contentStyle={styles.content}
      {...props}
    >
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 12,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

export default CustomButton;
