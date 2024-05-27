import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

const EmailInput = ({ email, setEmail }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        label="Email"
        value={email}
        style={styles.input}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <View style={styles.icon}>
        <Icon name="mail" size={20} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: "relative",
    justifyContent: "center",
  },
  input: {
    marginBottom: 12,
    backgroundColor: "white",
  },
  icon: {
    position: "absolute",
    right: 15,
    top: 15,
  },
});

export default EmailInput;