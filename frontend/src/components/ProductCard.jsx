import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ product }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { productId: product._id })}>
      <View style={[styles.itemContainer, product.stock === 0 && styles.outOfStock]}>
        <Image source={{ uri: product.images[0]?.url }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>${product.price?.toFixed(2)}</Text>
          <Text style={styles.description}>{product.description}</Text>
          {product.stock === 0 && <Text style={styles.outOfStockText}>Ürün tükendi</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "151718",
    position: "relative",
  },
  outOfStock: {
    opacity: 0.5,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontWeight: "bold",
  },
  price: {
    color: "green",
  },
  description: {
    color: "gray",
  },
  outOfStockText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
    transform: [{ rotate: '-30deg' }],
    position: "absolute",
    top: "40%",
    left: "10%",
    zIndex: 1,
  },
});

export default ProductCard;