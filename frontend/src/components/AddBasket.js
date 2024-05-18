import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import { addToCart } from "../redux/cartSlice";

const AddBasket = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.carts.items);
  const [error, setError] = useState('');

  const handleAddToCart = () => {
    const existingCartItem = cartItems.find(item => item._id === product._id);
    const quantityInCart = existingCartItem ? existingCartItem.quantity : 0;

    if (quantityInCart + 1 > product.stock) {
      setError('Stok sayısını geçtiniz');
      Toast.show({
        type: "error",
        text1: "Stok sayısını geçtiniz!",
        position: "bottom",
        visibilityTime: 2000,
      });
    } else {
      setError('');
      dispatch(addToCart({ ...product, quantity: 1 }));
      Toast.show({
        type: "success",
        text1: "Product added to cart!",
        position: "bottom",
        visibilityTime: 2000,
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Add to Basket</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
});

export default AddBasket;