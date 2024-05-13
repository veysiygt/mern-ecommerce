import React, { useEffect } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Header from "@/components/Header";
import { AppDispatch, RootState } from "../redux/store";
import ProductCard from "@/components/ProductCard"; // ProductCard bileşenini import ettik
import { Product } from "@/types/product";
import { getProducts } from "../redux/productSlice";

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  console.log(products, loading, "urunlerr");

  const renderItem = ({ item, index }: { item: Product; index: number }) => (
    <ProductCard key={index.toString()} product={item} />
  );

  return (
    <View style={styles.container}>
      <Header />
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={products.products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
