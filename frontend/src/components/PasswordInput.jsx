import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

const PasswordInput = ({ password, setPassword, secureTextEntry, toggleSecureEntry }) => {
  return (
    <View style={styles.passwordContainer}>
      <TextInput
        label="Password"
        value={password}
        style={styles.input}
        onChangeText={setPassword}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={toggleSecureEntry} style={styles.icon}>
        <Icon name={secureTextEntry ? "eye-off" : "eye"} size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  passwordContainer: {
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

export default PasswordInput;