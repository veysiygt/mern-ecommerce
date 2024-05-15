import React, { useEffect } from "react";
 import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
 import { useDispatch, useSelector } from "react-redux";
 import { getProducts } from "../redux/productSlice";
 import Header from "../layout/Header";
import ProductCard from "../components/ProductCard";

 const HomeScreen = () => {
   const dispatch = useDispatch();
   const { products, loading } = useSelector((state) => state.products);

   useEffect(() => {
     dispatch(getProducts());
   }, [dispatch]);
   
   const renderItem = ({ item }) => <ProductCard product={item} />;

   return (
     <View style={styles.container}>
       <Header />
       {loading ? (
         <View style={styles.loadingContainer}>
           <ActivityIndicator size="large" color="#11181C" />
         </View>
       ) : (
         <FlatList
           data={products.products}
           renderItem={renderItem}
           keyExtractor={(item) => item.id?.toString() ?? item.name}
         />
       )}
     </View>
   );
 };

 const styles = StyleSheet.create({
   container: {
     flex: 1,
   },
   loadingContainer: {
     flex: 1,
     justifyContent: "center",
     alignItems: "center",
   },
 });

 export default HomeScreen;
