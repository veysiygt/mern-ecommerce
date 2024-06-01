import React from "react";
import { Button, ActivityIndicator } from "react-native-paper";
import { StyleSheet } from "react-native";

const CustomButton = ({
  onPress,
  title,
  mode = "contained",
  style,
  width,
  height,
  isLoading,
  ...props
}) => {
  const buttonColor = isLoading ? "#6A56A6" : "#6A56A6";

  return (
    <Button
      mode={mode}
      onPress={onPress}
      style={[styles.button, { width, height, backgroundColor: buttonColor }, style]}
      contentStyle={styles.content}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <ActivityIndicator color="#fff" /> : title}
    </Button>
  );
};

const styles = StyleSheet.create({
  content: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

export default CustomButton;