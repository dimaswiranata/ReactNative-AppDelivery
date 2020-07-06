import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from "../screen/index";
import AddressScreen from "../screen/address";
import CartScreen from "../screen/cart";
import ProfileScreen from "../screen/profile";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="Food"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Food') {
              iconName = focused
                ? 'restaurant'
                : 'restaurant-outline';
            } else if (route.name === 'Address') {
              iconName = focused 
                ? 'map' 
                : 'map-outline';
            } else if (route.name === 'Cart') {
              iconName = focused 
                ? 'basket' 
                : 'basket-outline';
            } else if (route.name === 'Profile') {
              iconName = focused 
                ? 'person' 
                : 'person-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#900',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Food" component={HomeScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Address" component={AddressScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}