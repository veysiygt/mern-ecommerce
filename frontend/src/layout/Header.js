import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { Appbar, Searchbar } from "react-native-paper";
import CartIcon from "../components/CartIcon";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItemCount, setCartItemCount] = useState(1);

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <KeyboardAvoidingView>
      <Appbar.Header style={styles.header}>
        <Searchbar
          placeholder="Search..."
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchbar}
        />
        <Appbar.Content />
        <CartIcon
          cartItemCount={cartItemCount} 
          onPress={() => console.log("Cart opened")} 
          style={styles.cartIcon}
        />
      </Appbar.Header>
    </KeyboardAvoidingView>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "151718",
  },
  searchbar: {
    flex: 6,
    backgroundColor: "#fff",
    borderWidth: 1,
  },
  cartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
