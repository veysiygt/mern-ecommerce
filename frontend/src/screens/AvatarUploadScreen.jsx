import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Title } from "react-native-paper";
import CustomButton from "../components/CustomButton";
import AvatarPicker from "../components/AvatarPicker";
import Icon from "react-native-vector-icons/Ionicons";

const AvatarUploadScreen = ({ navigation }) => {
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!avatar) {
      setError("Avatar is required");
    } else {
      setError("");
      navigation.navigate("Register", { avatar });
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Select Avatar</Title>
      <AvatarPicker
        avatar={avatar}
        setAvatar={setAvatar}
        error={error}
        clearError={() => setError("")}
      />
      <View style={styles.buttonRow}>
        <CustomButton
          onPress={() => navigation.goBack()}
          title={
            <View style={styles.buttonContent}>
              <Icon name="arrow-back" size={20} color="white" />
              <Text style={styles.buttonText}>Back</Text>
            </View>
          }
          width={150}
          height={50}
        />
        <CustomButton
          onPress={handleNext}
          title={
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Next</Text>
              <Icon name="arrow-forward" size={20} color="white" />
            </View>
          }
          width={150}
          height={50}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 120,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    marginLeft: 5,
    marginRight: 5,
    color: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
});

export default AvatarUploadScreen;
