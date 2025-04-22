// src/screens/ProfileScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator 
} from 'react-native';
import { supabase } from '../api/supabase';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // App.js içindeki listener otomatik olarak Login'e döndürecek
  };

  if (!user) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  // Kullanıcının katılım tarihini “gg.aa.yyyy” formatında göster
  const joinedDate = new Date(user.created_at).toLocaleDateString();

  return (
    <ScrollView style={styles.container}>
      {/* Profil Başlığı */}
      <View style={styles.header}>
        <Ionicons name="person-circle" size={100} color="#007BFF" />
        <Text style={styles.name}>
          {user.user_metadata.full_name || 'KriptoMentor Kullanıcısı'}
        </Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {/* İstatistik Kartları */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <MaterialCommunityIcons name="chart-line" size={32} color="#007BFF" />
          <Text style={styles.statValue}>42</Text>
          <Text style={styles.statLabel}>Üretilen Sinyal</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialCommunityIcons name="thumb-up" size={32} color="#007BFF" />
          <Text style={styles.statValue}>76%</Text>
          <Text style={styles.statLabel}>Beğeni Oranı</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialCommunityIcons name="calendar" size={32} color="#007BFF" />
          <Text style={styles.statValue}>{joinedDate}</Text>
          <Text style={styles.statLabel}>Katılım Tarihi</Text>
        </View>
      </View>

      {/* Profili Düzenle */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text style={styles.buttonText}>Profili Düzenle</Text>
      </TouchableOpacity>

      {/* Çıkış Yap */}
      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7fa' },
  loader: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f7fa'
  },
  header: {
    backgroundColor: '#fff',
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 2,
  },
  name: { fontSize: 22, fontWeight: 'bold', marginTop: 12 },
  email: { fontSize: 16, color: '#666', marginTop: 4 },

  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    elevation: 2,
  },
  statValue: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  statLabel: { fontSize: 12, color: '#666', textAlign: 'center', marginTop: 4 },

  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    marginHorizontal: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  logoutButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007BFF',
    marginBottom: 32,
  },
  logoutText: { color: '#007BFF', fontSize: 16, fontWeight: 'bold' },
});
