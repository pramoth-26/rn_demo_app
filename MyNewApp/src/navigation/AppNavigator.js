import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import DrawerNavigator from './DrawerNavigator';
import LoginScreen from '../screens/LoginScreen';

const AppNavigator = () => {
  const { theme } = useTheme();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return null; // Or a loading screen
  }

  return (
    <>
      <StatusBar style={theme.dark ? 'light' : 'dark'} />
      <NavigationContainer theme={theme}>
        {user ? <DrawerNavigator /> : <LoginScreen />}
      </NavigationContainer>
    </>
  );
};

export default AppNavigator;
