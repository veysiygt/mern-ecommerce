import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Appbar, Badge, Searchbar } from "react-native-paper";

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cartItemCount, setCartItemCount] = useState<number>(1);

  const onChangeSearch = (query: string) => setSearchQuery(query);

  return (
    <Appbar.Header style={styles.header}>
      <Searchbar
        placeholder="Search..."
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      <View style={styles.iconContainer}>
        <Appbar.Action icon="cart" onPress={() => console.log("Cart opened")} />
        {cartItemCount > 0 && (
          <Badge style={styles.badge}>{cartItemCount}</Badge>
        )}
      </View>
    </Appbar.Header>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "151718",
  },
  searchbar: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
  },
  iconContainer: {
    position: 'relative',
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
  },
});
``
