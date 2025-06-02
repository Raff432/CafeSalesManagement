import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import { HomeScreen } from './components/HomeScreen';
import { ProgressScreen } from './components/ProgressScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { MenuScreen } from './components/MenuScreen';
import { CartScreen } from './components/CartScreen';
import { LoginScreen } from './components/auth/LoginScreen';
import { RegisterScreen } from './components/auth/RegisterScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { CartProvider } from './contexts/CartContext';
import { ChallengeProvider } from './contexts/ChallengeContext';
import { FloatingCartButton } from './components/FloatingCartButton';
import { ReceiptUploadScreen } from './components/ReceiptUploadScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
  Cart: undefined;
  Checkout: undefined;
  AccountSettings: undefined;
  Notifications: undefined;
  PaymentMethods: undefined;
  OrderHistory: undefined;
  Preferences: undefined;
  ReceiptUpload: undefined;
};

type TabParamList = {
  Home: undefined;
  Progress: undefined;
  Menu: undefined;
  Profile: undefined;
  Leaderboard: undefined;
  Favorites: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export type TabScreenProps<T extends keyof TabParamList> = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

interface TabNavigatorProps {
  onSignOut: () => void;
}

const TabNavigator: React.FC<TabNavigatorProps> = ({ onSignOut }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }: { color: string; size: number }) => {
          let iconName: string;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Progress':
              iconName = 'award';
              break;
            case 'Menu':
              iconName = 'menu';
              break;
            case 'Profile':
              iconName = 'user';
              break;
            default:
              iconName = 'circle';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ec4899',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen 
        name="Profile" 
        component={(props: TabScreenProps<'Profile'>) => <ProfileScreen {...props} onSignOut={onSignOut} />}
      />
    </Tab.Navigator>
  );
};

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (email: string, password: string) => {
    console.log('Logging in with:', email, password);
    setIsAuthenticated(true);
  };

  const handleRegister = (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    console.log('Registering with:', data);
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
  };

  return (
    <NavigationContainer>
      <CartProvider>
        <ChallengeProvider>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isAuthenticated ? (
              <>
                <Stack.Screen 
                  name="Login" 
                  component={(props: RootStackScreenProps<'Login'>) => (
                    <LoginScreen 
                      {...props}
                      onLogin={handleLogin}
                      onRegister={() => props.navigation.navigate('Register')}
                    />
                  )}
                />
                <Stack.Screen 
                  name="Register" 
                  component={(props: RootStackScreenProps<'Register'>) => (
                    <RegisterScreen 
                      {...props}
                      onRegister={handleRegister}
                      onLogin={() => props.navigation.navigate('Login')}
                    />
                  )}
                />
              </>
            ) : (
              <>
                <Stack.Screen 
                  name="MainTabs" 
                  component={() => <TabNavigator onSignOut={handleSignOut} />}
                />
                <Stack.Screen 
                  name="Cart" 
                  component={CartScreen}
                  options={{ presentation: 'modal' }}
                />
                <Stack.Screen 
                  name="Checkout" 
                  component={CheckoutScreen}
                  options={{ presentation: 'modal' }}
                />
                <Stack.Screen 
                  name="ReceiptUpload" 
                  component={ReceiptUploadScreen}
                  options={{ presentation: 'modal' }}
                />
              </>
            )}
          </Stack.Navigator>
        </ChallengeProvider>
      </CartProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fce7f3', // pink-50 equivalent
  },
});