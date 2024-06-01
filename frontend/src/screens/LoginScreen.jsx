import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Title, HelperText } from "react-native-paper";
import { Formik } from "formik";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";
import CustomButton from "../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, reset } from "../redux/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginSchema } from "../validations/loginValidation";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isLoading, isError, errorMessage, isSuccess, userToken } =
    useSelector((state) => state.auth);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  useEffect(() => {
    if (isSuccess && userToken) {
      console.log("Login successful, navigating to Home tab");
      AsyncStorage.setItem("userToken", userToken).then(() => {
        navigation.navigate("Home");
        dispatch(reset());
      });
    }
  }, [isSuccess, userToken, dispatch, navigation]);

  const handleLogin = async (values) => {
    await dispatch(
      loginUser({ email: values.email, password: values.password })
    );
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
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ handleChange, handleSubmit, values, errors, touched }) => (
              <View>
                {isError && (
                  <HelperText
                    type="error"
                    visible={true}
                    style={styles.helperText}
                  >
                    {errorMessage}
                  </HelperText>
                )}
                <EmailInput
                  email={values.email}
                  setEmail={handleChange("email")}
                  error={touched.email && errors.email ? errors.email : ""}
                  isValid={touched.email && !errors.email}
                />
                <PasswordInput
                  label="Password"
                  password={values.password}
                  setPassword={handleChange("password")}
                  secureTextEntry={secureTextEntry}
                  toggleSecureEntry={toggleSecureEntry}
                  error={
                    touched.password && errors.password ? errors.password : ""
                  }
                  isValid={touched.password && !errors.password}
                />
                <View style={styles.customButton}>
                  <CustomButton
                    onPress={handleSubmit}
                    title="Login"
                    width={150}
                    height={50}
                    isLoading={isLoading}
                  />
                  <Text style={styles.orText}>or</Text>
                  <CustomButton
                    onPress={() => navigation.navigate("AvatarUpload")}
                    title="Register"
                    width={150}
                    height={50}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 120,
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
  helperText: {
    textAlign: "center",
  },
});

export default LoginScreen;