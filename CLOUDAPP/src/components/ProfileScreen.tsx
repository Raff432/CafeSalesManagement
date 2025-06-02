import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import type { TabScreenProps } from '../App';
import { useChallenge } from '../contexts/ChallengeContext';

type ProfileScreenProps = TabScreenProps<'Profile'> & {
  onSignOut: () => void;
};

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  navigation,
  onSignOut,
}) => {
  const { state: challengeState } = useChallenge();

  const menuItems = [
    {
      id: 'orders',
      title: 'Order History',
      icon: 'shopping-bag',
      onPress: () => {},
    },
    {
      id: 'payment',
      title: 'Payment Methods',
      icon: 'credit-card',
      onPress: () => {},
    },
    {
      id: 'address',
      title: 'Delivery Addresses',
      icon: 'map-pin',
      onPress: () => {},
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: 'bell',
      onPress: () => {},
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: 'settings',
      onPress: () => {},
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: 'help-circle',
      onPress: () => {},
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileInfo}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
            }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
        </View>

        {/* Points Card */}
        <View style={styles.pointsCard}>
          <View style={styles.pointsInfo}>
            <Icon name="award" size={24} color="#ec4899" />
            <Text style={styles.pointsValue}>
              {challengeState.totalPoints} pts
            </Text>
          </View>
          <TouchableOpacity
            style={styles.viewPointsButton}
            onPress={() => navigation.navigate('Progress')}
          >
            <Text style={styles.viewPointsText}>View Progress</Text>
            <Icon name="chevron-right" size={20} color="#ec4899" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        {menuItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <View style={styles.menuItemContent}>
              <Icon name={item.icon} size={24} color="#374151" />
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <Icon name="chevron-right" size={20} color="#9ca3af" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={onSignOut}
      >
        <Icon name="log-out" size={24} color="#ef4444" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#ec4899',
    padding: 20,
    paddingTop: 40,
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#fce7f3',
  },
  pointsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ec4899',
    marginLeft: 8,
  },
  viewPointsButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewPointsText: {
    fontSize: 16,
    color: '#ec4899',
    marginRight: 4,
  },
  menuSection: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 24,
    backgroundColor: '#fef2f2',
    borderRadius: 12,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444',
  },
});