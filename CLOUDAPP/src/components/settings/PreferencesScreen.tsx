import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import type { RootStackScreenProps } from '../../App';

type PreferencesScreenProps = RootStackScreenProps<'Preferences'>;

export const PreferencesScreen: React.FC<PreferencesScreenProps> = ({
  navigation,
}) => {
  const [darkMode, setDarkMode] = useState(false);
  const [orderHistory, setOrderHistory] = useState(true);
  const [locationServices, setLocationServices] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Preferences</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Dark Mode</Text>
              <Text style={styles.settingDescription}>
                Switch to dark theme
              </Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#d1d5db', true: '#fce7f3' }}
              thumbColor={darkMode ? '#ec4899' : '#9ca3af'}
            />
          </View>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Order History</Text>
              <Text style={styles.settingDescription}>
                Keep track of your past orders
              </Text>
            </View>
            <Switch
              value={orderHistory}
              onValueChange={setOrderHistory}
              trackColor={{ false: '#d1d5db', true: '#fce7f3' }}
              thumbColor={orderHistory ? '#ec4899' : '#9ca3af'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location Services</Text>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Enable Location</Text>
              <Text style={styles.settingDescription}>
                Allow app to access your location for better service
              </Text>
            </View>
            <Switch
              value={locationServices}
              onValueChange={setLocationServices}
              trackColor={{ false: '#d1d5db', true: '#fce7f3' }}
              thumbColor={locationServices ? '#ec4899' : '#9ca3af'}
            />
          </View>
        </View>

        <View style={styles.infoSection}>
          <Icon name="info" size={20} color="#6b7280" />
          <Text style={styles.infoText}>
            Your preferences are automatically saved and synced across devices.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ec4899',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#374151',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  infoSection: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f3f4f6',
    marginTop: 24,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});