// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { supabase } from './src/api/supabase';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Mevcut oturumu al
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Oturum değişikliklerini dinle
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );
    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator session={session} />
    </NavigationContainer>
  );
}
