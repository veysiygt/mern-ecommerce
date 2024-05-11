import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ProductItem from './ProductItem';
import { Product } from '@/types/product';

interface ProductListProps {
  products: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => <ProductItem product={item} />}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default ProductList;
