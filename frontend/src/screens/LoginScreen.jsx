import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Title } from "react-native-paper";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import CustomButton from "../components/CustomButton";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleLogin = () => {
    console.log("Email:", email, "Password:", password);
  };

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 10}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Title style={styles.title}>Login</Title>
          <EmailInput email={email} setEmail={setEmail} />
          <PasswordInput
            password={password}
            setPassword={setPassword}
            secureTextEntry={secureTextEntry}
            toggleSecureEntry={toggleSecureEntry}
          />
          <View style={styles.customButton}>
            <CustomButton
              onPress={handleLogin}
              title="Login"
              width={150}
              height={50}
            />
            <Text style={styles.orText}>or</Text>
            <CustomButton
              onPress={() => navigation.navigate("Register")}
              title="Register"
              width={150}
              height={50}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  customButton: {
    alignItems: "center",
  },
  orText: {
    textAlign: "center",
    marginVertical: 12,
    fontSize: 16,
    color: "gray",
  },
});

export default LoginScreen;