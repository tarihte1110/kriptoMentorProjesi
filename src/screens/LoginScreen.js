// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../api/supabase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      Alert.alert('Giriş Hatası', error.message);
    } else {
      // session dinleyicisi App.js içinde Main'e yönlendirecek
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KriptoMentor Giriş</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Bekleyin...' : 'Giriş Yap'}</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>Hesabınız yok mu?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerButton}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 24, fontWeight: 'bold' },
  input: { width: '100%', height: 50, borderColor: '#ccc', borderWidth: 1, marginBottom: 12, paddingHorizontal: 10, borderRadius: 5 },
  button: { width: '100%', height: 50, backgroundColor: '#007BFF', borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginTop: 12 },
  buttonText: { color: '#fff', fontSize: 18 },
  registerContainer: { marginTop: 20, alignItems: 'center' },
  registerText: { fontSize: 16, color: '#333' },
  registerButton: { fontSize: 16, color: '#007BFF', marginTop: 8, textDecorationLine: 'underline' },
});
