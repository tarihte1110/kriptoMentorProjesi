// src/screens/MarketScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MarketScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Güncel Piyasa</Text>
      <Text>Burada güncel kripto piyasası verileri gösterilecek.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
