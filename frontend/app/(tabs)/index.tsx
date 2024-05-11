import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Header from '@/components/Header';
import ProductList from '@/components/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/productSlice';
import { AppDispatch, RootState } from '../redux/store';

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  
  return (
    <View style={styles.container}>
      <Header />
      {loading ? (
        <Text>Loading...</Text>
      ) : products.length > 0 ? (
        <ProductList products={products} />
      ) : (
        <Text style={styles.notFound}>Product not found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
  }
});
