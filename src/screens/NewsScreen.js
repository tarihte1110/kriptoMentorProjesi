// src/screens/NewsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NewsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kripto Haberleri</Text>
      <Text>Burada güncel kripto haberleri listelenecek.</Text>
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
