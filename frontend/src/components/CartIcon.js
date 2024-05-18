import React from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Badge } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const CartIcon = ({ cartItemCount, style }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Cart');
  };

  return (
    <View style={[styles.iconContainer, style]}>
      <Appbar.Action icon="cart" onPress={handlePress} />
      {cartItemCount > 0 && (
        <Badge style={styles.badge}>{cartItemCount}</Badge>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
  },
});

export default CartIcon;