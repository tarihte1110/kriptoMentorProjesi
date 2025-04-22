// src/navigation/AppNavigator.js

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MainTabNavigator from './MainTabNavigator';
import EditProfileScreen from '../screens/EditProfileScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator({ session }) {
  const isAuthenticated = !!session;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Main"
            component={MainTabNavigator}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{
              headerShown: true,
              title: 'Profili Düzenle',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
