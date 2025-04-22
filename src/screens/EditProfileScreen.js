// src/screens/EditProfileScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { supabase } from '../api/supabase';

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setName(user.user_metadata.full_name || '');
    });
  }, []);

  const handleSave = async () => {
    const { error } = await supabase.auth.updateUser({
      data: { full_name: name },
    });
    if (error) {
      Alert.alert('Hata', error.message);
    } else {
      Alert.alert('Başarılı', 'Profil güncellendi.', [
        { text: 'Tamam', onPress: () => navigation.goBack() },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ad Soyad</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ad Soyad"
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa', padding: 24 },
  label: { fontSize: 16, marginBottom: 8, color: '#333' },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
