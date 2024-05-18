import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from "./screens/HomeScreen";
import BasketScreen from "./screens/BasketScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ProductDetailScreen from "./screens/ProductDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="HomeMain"  
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Cart" 
        component={BasketScreen} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

function Index() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeStack} 
          options={{ headerShown: false }} 
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ headerShown: false }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Index;
