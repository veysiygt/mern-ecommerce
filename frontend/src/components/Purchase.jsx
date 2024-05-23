// Purchase.jsx
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const Purchase = ({ onPurchase }) => {
  return (
    <View style={styles.container}>
      <Button title="Purchase" onPress={onPurchase} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
});

export default Purchase;