// src/navigation/MainTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MarketScreen from '../screens/MarketScreen';
import NewsScreen from '../screens/NewsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Expo'da önceden kurulu

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // Her ekran için ikon belirliyoruz
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Ana Ekran') {
            iconName = 'home';
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Piyasa') {
            iconName = 'trending-up';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Haberler') {
            iconName = 'newspaper';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Profil') {
            iconName = 'person';
            return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#007BFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Ana Ekran" component={HomeScreen} />
      <Tab.Screen name="Piyasa" component={MarketScreen} />
      <Tab.Screen name="Haberler" component={NewsScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
