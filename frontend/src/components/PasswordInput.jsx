import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

const PasswordInput = ({
  password,
  setPassword,
  secureTextEntry,
  toggleSecureEntry,
  label,
  error,
  isValid,
}) => {
  return (
    <View style={styles.passwordContainer}>
      <TextInput
        label={label}
        value={password}
        style={styles.input}
        onChangeText={setPassword}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        error={!!error}
      />
      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>
      <View style={styles.iconContainer}>
        {isValid && <Icon name="checkmark-circle" size={20} color="green" />}
        <TouchableOpacity onPress={toggleSecureEntry} style={styles.icon}>
          <Icon name={secureTextEntry ? "eye-off" : "eye"} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  passwordContainer: {
    position: "relative",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "white",
  },
  iconContainer: {
    position: "absolute",
    right: 15,
    top: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 5,
  },
});

export default PasswordInput;
