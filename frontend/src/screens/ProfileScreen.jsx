import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigation.navigate("Login");
    });
  };
  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
    marginTop: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileScreen;
