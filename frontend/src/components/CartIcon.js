import React from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Badge } from "react-native-paper";

const CartIcon = ({ cartItemCount, onPress, style }) => {
  return (
    <View style={[styles.iconContainer, style]}>
      <Appbar.Action icon="cart" onPress={onPress} />
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
