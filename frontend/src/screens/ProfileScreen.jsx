import React from "react";
import { View, StyleSheet, Text } from "react-native";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>sadsadsa</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    alignItems: "center",
    marginTop: 100
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProfileScreen;
