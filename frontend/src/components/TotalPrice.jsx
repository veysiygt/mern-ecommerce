import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TotalPrice = ({ totalPrice }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.totalPrice}>Total Price: ${totalPrice}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TotalPrice;