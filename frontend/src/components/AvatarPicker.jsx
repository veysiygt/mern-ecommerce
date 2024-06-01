import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { launchImageLibrary } from "react-native-image-picker";
import { HelperText } from "react-native-paper";

const AvatarPicker = ({ avatar, setAvatar, error, clearError }) => {
  const selectImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        const source = {
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          name: response.assets[0].fileName,
        };
        setAvatar(source);
        clearError();
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={selectImage} style={styles.avatarContainer}>
        {avatar ? (
          <Image source={{ uri: avatar.uri }} style={styles.avatar} />
        ) : (
          <View style={styles.placeholder}>
            <Icon name="person" size={50} color="#888" />
          </View>
        )}
      </TouchableOpacity>
      <HelperText type="error" visible={!!error} style={styles.helperText}>
        {error}
      </HelperText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 16,
  },
  avatarContainer: {
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  helperText: {
    textAlign: "center",
  },
});

export default AvatarPicker;
