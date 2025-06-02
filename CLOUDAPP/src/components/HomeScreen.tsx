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
import { useCart } from '../contexts/CartContext';
import { useChallenge } from '../contexts/ChallengeContext';

type HomeScreenProps = TabScreenProps<'Home'>;

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { state: cartState } = useCart();
  const { state: challengeState } = useChallenge();

  const featuredItems = [
    {
      id: '1',
      name: 'Cold Brew Coffee',
      description: 'Smooth and refreshing cold brewed coffee',
      price: 150,
      image: 'https://example.com/cold-brew.jpg',
    },
    {
      id: '2',
      name: 'Matcha Latte',
      description: 'Premium Japanese matcha with steamed milk',
      price: 180,
      image: 'https://example.com/matcha-latte.jpg',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning</Text>
          <Text style={styles.userName}>John Doe</Text>
        </View>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Icon name="shopping-bag" size={24} color="#fff" />
          {cartState.items.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>
                {cartState.items.length}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Points Section */}
      <View style={styles.pointsCard}>
        <View style={styles.pointsHeader}>
          <Icon name="award" size={24} color="#ec4899" />
          <Text style={styles.pointsTitle}>Your Points</Text>
        </View>
        <Text style={styles.pointsValue}>{challengeState.totalPoints}</Text>
        <TouchableOpacity
          style={styles.viewChallengesButton}
          onPress={() => navigation.navigate('Progress')}
        >
          <Text style={styles.viewChallengesText}>View Challenges</Text>
          <Icon name="chevron-right" size={20} color="#ec4899" />
        </TouchableOpacity>
      </View>

      {/* Featured Items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Items</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredItems}
        >
          {featuredItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.featuredItem}
              onPress={() => navigation.navigate('Menu')}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.featuredItemImage}
              />
              <View style={styles.featuredItemContent}>
                <Text style={styles.featuredItemName}>{item.name}</Text>
                <Text style={styles.featuredItemDescription}>
                  {item.description}
                </Text>
                <Text style={styles.featuredItemPrice}>
                  ₱{item.price.toFixed(2)}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => navigation.navigate('Menu')}
          >
            <Icon name="coffee" size={24} color="#ec4899" />
            <Text style={styles.quickActionText}>Order Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => navigation.navigate('Progress')}
          >
            <Icon name="award" size={24} color="#ec4899" />
            <Text style={styles.quickActionText}>Challenges</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => navigation.navigate('Profile')}
          >
            <Icon name="user" size={24} color="#ec4899" />
            <Text style={styles.quickActionText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ec4899',
  },
  greeting: {
    fontSize: 16,
    color: '#fce7f3',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  cartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: '#ec4899',
    fontSize: 12,
    fontWeight: 'bold',
  },
  pointsCard: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  pointsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  pointsTitle: {
    marginLeft: 8,
    fontSize: 16,
    color: '#374151',
  },
  pointsValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ec4899',
    marginBottom: 12,
  },
  viewChallengesButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewChallengesText: {
    color: '#ec4899',
    marginRight: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#374151',
  },
  featuredItems: {
    paddingRight: 16,
  },
  featuredItem: {
    width: 280,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featuredItemImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  featuredItemContent: {
    padding: 12,
  },
  featuredItemName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  featuredItemDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  featuredItemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ec4899',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fce7f3',
    borderRadius: 12,
    marginHorizontal: 8,
  },
  quickActionText: {
    marginTop: 8,
    fontSize: 14,
    color: '#ec4899',
  },
});