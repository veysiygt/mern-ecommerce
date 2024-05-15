import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { Appbar } from "react-native-paper";
import CartIcon from "../components/CartIcon";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail } from "../redux/productSlice";
import AddBasket from "../components/AddBasket";

const ProductDetailScreen = ({ route }) => {
  const { productId } = route.params;
  const dispatch = useDispatch();
  const { productDetail, loading } = useSelector((state) => state.products);
  const { itemCount } = useSelector((state) => state.carts);
  const navigation = useNavigation();

  useEffect(() => {
    if (productId) {
      dispatch(getProductDetail(productId));
    }
  }, [dispatch, productId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!productDetail || Object.keys(productDetail).length === 0) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Product Detail" />
        <CartIcon
          cartItemCount={itemCount}
          onPress={() => console.log("Cart opened")}
        />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={{ uri: productDetail.images?.[0]?.url || "" }}
          style={styles.image}
        />
        <Text style={styles.name}>
          {productDetail.name || "No name available"}
        </Text>
        <Text style={styles.price}>
          ${productDetail.price?.toFixed(2) || "N/A"}
        </Text>
        <Text style={styles.description}>
          {productDetail.description || "No description available"}
        </Text>
        <View style={styles.buttonContainer}>
          <AddBasket product={productDetail} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "151718",
  },
  scrollContainer: {
    padding: 16,
  },
  image: {
    width: "100%",
    height: 300,
  },
  name: {
    fontWeight: "bold",
    fontSize: 24,
    marginVertical: 10,
  },
  price: {
    color: "green",
    fontSize: 20,
    marginVertical: 5,
  },
  description: {
    color: "gray",
    fontSize: 16,
  },
  buttonContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
});

export default ProductDetailScreen;
