import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { increaseQuantity, decreaseQuantity } from '../redux/cartSlice';
import TotalPrice from '../components/TotalPrice'; // TotalPrice bileşenini import ediyoruz
import Purchase from '../components/Purchase'; // Purchase bileşenini import ediyoruz

const BasketScreen = () => {
  const cartItems = useSelector((state) => state.carts.items);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleIncreaseQuantity = (item) => {
    dispatch(increaseQuantity({ _id: item._id }));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseQuantity({ _id: item._id }));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handlePurchase = () => {
    console.log('Purchase pressed');
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.images[0]?.url }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price?.toFixed(2)}</Text>
        <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={() => handleDecreaseQuantity(item)}>
          <Icon name="remove-circle-outline" size={25} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleIncreaseQuantity(item)}>
          <Icon name="add-circle-outline" size={25} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Your Basket" />
      </Appbar.Header>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item._id.toString()}
          />
          <TotalPrice totalPrice={calculateTotalPrice()} />
          <Purchase onPurchase={handlePurchase} />
        </>
      ) : (
        <Text style={styles.emptyText}>Your basket is empty.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "151718",
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: "#f9f9f9",
    marginVertical: 5,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
  },
  price: {
    color: 'green',
  },
  quantity: {
    color: 'gray',
  },
  actionsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'gray',
    marginTop: 20,
  },
});

export default BasketScreen;