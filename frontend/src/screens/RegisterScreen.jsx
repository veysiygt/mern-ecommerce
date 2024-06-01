import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
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
import { registerUser, reset } from "../redux/authSlice";
import { RegisterSchema } from "../validations/registerValidation";
import NameInput from "../components/NameInput";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { avatar } = route.params || {};
  const { isLoading, isError, errorMessage, isSuccess, userToken } =
    useSelector((state) => state.auth);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [secureTextEntryConfirm, setSecureTextEntryConfirm] = useState(true);

  useEffect(() => {
    if (isSuccess && userToken) {
      console.log("Registration successful, navigating to HomeScreen");
      AsyncStorage.setItem("userToken", userToken).then(() => {
        navigation.navigate("HomeScreen");
        dispatch(reset());
      });
    }
  }, [isSuccess, userToken, dispatch, navigation]);

  const handleRegister = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("avatar", {
      uri: avatar.uri,
      name: avatar.name,
      type: avatar.type,
    });

    await dispatch(registerUser(formData));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Title style={styles.title}>Register</Title>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              passwordConfirm: "",
            }}
            validationSchema={RegisterSchema}
            onSubmit={handleRegister}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
            }) => (
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
                <NameInput
                  name={values.name}
                  setName={handleChange("name")}
                  error={touched.name && errors.name ? errors.name : ""}
                  isValid={touched.name && !errors.name}
                />
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
                  toggleSecureEntry={() => setSecureTextEntry(!secureTextEntry)}
                  error={
                    touched.password && errors.password ? errors.password : ""
                  }
                  isValid={touched.password && !errors.password}
                />
                <PasswordInput
                  label="Password Confirmation"
                  password={values.passwordConfirm}
                  setPassword={handleChange("passwordConfirm")}
                  secureTextEntry={secureTextEntryConfirm}
                  toggleSecureEntry={() =>
                    setSecureTextEntryConfirm(!secureTextEntryConfirm)
                  }
                  error={
                    touched.passwordConfirm && errors.passwordConfirm
                      ? errors.passwordConfirm
                      : ""
                  }
                  isValid={touched.passwordConfirm && !errors.passwordConfirm}
                />
                <View style={styles.customButton}>
                  <CustomButton
                    onPress={handleSubmit}
                    title="Register"
                    width={150}
                    height={50}
                    isLoading={isLoading}
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
    marginTop: 90,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
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

export default RegisterScreen;
