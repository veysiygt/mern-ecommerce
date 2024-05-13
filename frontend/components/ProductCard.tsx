import { Product } from "@/types/product";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  return (
    <TouchableOpacity>
      <View style={styles.itemContainer}>
      <Image source={{ uri: product.images[0]?.url }} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>${product.price?.toFixed(2)}</Text>
          <Text style={styles.description}>{product.description}</Text>
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
});

export default ProductItem;
