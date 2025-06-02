import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Mail, Lock, Eye, EyeOff, Phone } from 'lucide-react-native';

interface LoginScreenProps {
  onRegister: () => void;
  onLogin: (email: string, password: string) => void;
}

export function LoginScreen({ onRegister, onLogin }: LoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onLogin(email, password);
  };

  return (
    <LinearGradient colors={['#fce4ec', '#fff']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.header}>Sign In</Text>

        {/* Logo and welcome text */}
        <View style={styles.logoWrap}>
          <View style={styles.logoCircle}>
            {/* Replace with a static image if needed */}
            <View style={styles.cloudShape}>
              <View style={styles.cloudMain} />
              <View style={styles.cloudBump1} />
              <View style={styles.cloudBump2} />
              <View style={styles.cloudBump3} />
              <View style={styles.cloudBump4} />
            </View>
          </View>
          <Text style={styles.welcome}>Welcome to</Text>
          <Text style={styles.appName}>CloudApp</Text>
        </View>

        {/* Form */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrap}>
            <Mail size={20} color="#9ca3af" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputWrap}>
            <Lock size={20} color="#9ca3af" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#9ca3af"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eye}>
              {showPassword ? <EyeOff size={20} color="#9ca3af" /> : <Eye size={20} color="#9ca3af" />}
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.divider}>Or continue with</Text>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg' }}
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text>G</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text>A</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Phone size={20} color="#4b5563" />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an Account?</Text>
          <TouchableOpacity onPress={onRegister}>
            <Text style={styles.footerLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 20, paddingTop: 60 },
  header: { fontSize: 18, fontWeight: '600', textAlign: 'center', marginBottom: 20 },
  logoWrap: { alignItems: 'center', marginBottom: 40 },
  logoCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: '#ec4899',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16
  },
  cloudShape: { position: 'relative', width: 80, height: 56 },
  cloudMain: { position: 'absolute', bottom: 0, left: 8, right: 8, height: 32, backgroundColor: '#fff', borderRadius: 16 },
  cloudBump1: { position: 'absolute', bottom: 16, left: 0, width: 32, height: 32, backgroundColor: '#fff', borderRadius: 16 },
  cloudBump2: { position: 'absolute', bottom: 24, left: 16, width: 40, height: 40, backgroundColor: '#fff', borderRadius: 20 },
  cloudBump3: { position: 'absolute', bottom: 24, right: 8, width: 32, height: 32, backgroundColor: '#fff', borderRadius: 16 },
  cloudBump4: { position: 'absolute', bottom: 16, right: 0, width: 24, height: 24, backgroundColor: '#fff', borderRadius: 12 },
  welcome: { fontSize: 22, color: '#111827', marginBottom: 4 },
  appName: { fontSize: 28, color: '#ec4899', fontWeight: 'bold' },
  inputContainer: { gap: 16, marginBottom: 24 },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', borderRadius: 16, paddingHorizontal: 12 },
  icon: { marginRight: 8 },
  input: { flex: 1, height: 50, color: '#111827' },
  eye: { padding: 4 },
  button: {
    backgroundColor: '#ec4899',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center'
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  divider: { textAlign: 'center', color: '#6b7280', marginBottom: 16 },
  socialRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center'
  },
  socialIcon: { width: 24, height: 24 },
  footer: { flexDirection: 'row', justifyContent: 'center' },
  footerText: { color: '#6b7280' },
  footerLink: { color: '#ec4899', marginLeft: 6, fontWeight: '600' }
});
