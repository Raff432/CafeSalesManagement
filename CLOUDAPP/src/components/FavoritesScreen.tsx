import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useCart } from '../contexts/CartContext';
import type { MenuItem } from '../types/menu';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { ParamListBase } from '@react-navigation/native';

interface TabParamList extends ParamListBase {
  Favorites: undefined;
}

type FavoritesScreenProps = BottomTabScreenProps<TabParamList, 'Favorites'>;

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({
  navigation,
}) => {
  const { state } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  // Convert cart items to menu items for display
  const favorites: MenuItem[] = state.favorites.map(item => ({
    id: item.id,
    name: item.name,
    price: item.price,
    category: 'favorites',
    image: item.image,
  }));
  
  const filteredFavorites = favorites.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderFavoriteItem = (item: MenuItem) => (
    <View style={styles.favoriteCard}>
      <Image
        source={{
          uri:
            item.image ||
            'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
        }}
        style={styles.itemImage}
      />
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <View>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>₱{item.price}</Text>
          </View>
          <TouchableOpacity
            style={styles.favoriteButton}
          >
            <Icon name="heart" size={20} color="#ec4899" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={24} color="#fff" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorites</Text>
        <View style={styles.searchContainer}>
          <Icon
            name="search"
            size={20}
            color="#fff"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search favorites..."
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
          />
        </View>
      </View>

      <ScrollView style={styles.content}>
        {filteredFavorites.length > 0 ? (
          <View style={styles.favoritesList}>
            {filteredFavorites.map((item) => (
              <View key={item.id}>{renderFavoriteItem(item)}</View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Icon name="heart" size={48} color="#d1d5db" />
            <Text style={styles.emptyStateTitle}>No favorites yet</Text>
            <Text style={styles.emptyStateText}>
              Heart your favorite items to see them here
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: '#ec4899',
    paddingTop: 40,
    padding: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#fff',
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  favoritesList: {
    gap: 16,
  },
  favoriteCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  itemImage: {
    width: 96,
    height: 96,
    borderRadius: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  itemPrice: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  favoriteButton: {
    padding: 8,
    borderRadius: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyStateTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
    marginTop: 12,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#9ca3af',
    marginTop: 4,
  },
});