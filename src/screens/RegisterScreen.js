// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../api/supabase';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler eşleşmiyor.');
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) {
      Alert.alert('Kayıt Hatası', error.message);
    } else {
      // Supabase otomatik oturum açma yaparsa Main gözükecek
      // Eğer e-posta onayı gerekiyorsa:
      Alert.alert('Başarılı', 'Lütfen e-postanızı onaylayın.');
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput style={styles.input} placeholder="Şifre" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput
        style={styles.input}
        placeholder="Şifre Tekrar"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Bekleyin...' : 'Kayıt Ol'}</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Hesabınız var mı?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginButton}>Giriş Yap</Text>
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
  loginContainer: { marginTop: 20, alignItems: 'center' },
  loginText: { fontSize: 16, color: '#333' },
  loginButton: { fontSize: 16, color: '#007BFF', marginTop: 8, textDecorationLine: 'underline' },
});
