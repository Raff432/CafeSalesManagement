import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useCart } from '../contexts/CartContext';
import { menuItems } from '../data/menuItems';
import type { MenuItem } from '../types/menu';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { ParamListBase } from '@react-navigation/native';

interface TabParamList extends ParamListBase {
  Menu: undefined;
}

type MenuScreenProps = BottomTabScreenProps<TabParamList, 'Menu'>;

export const MenuScreen: React.FC<MenuScreenProps> = ({ navigation }) => {
  const { addToCart, state, toggleFavorite } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all-items');

  // Get all menu items flattened for search
  const allMenuItems = useMemo(() => {
    const items: MenuItem[] = [];
    menuItems.drinks.forEach(section => {
      section.items.forEach(item => {
        items.push({
          ...item,
          id: `${section.section}-${item.name}`.toLowerCase().replace(/\s+/g, '-'),
          category: section.section,
        });
      });
    });
    return items;
  }, []);

  // Filter menu items based on search query and category
  const filteredItems = useMemo(() => {
    return allMenuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all-items' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allMenuItems, searchQuery, selectedCategory]);

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => handleAddToCart(item)}
    >
      <Image
        source={{
          uri: item.image || 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
        }}
        style={styles.itemImage}
      />
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        {item.description && (
          <Text style={styles.itemDescription} numberOfLines={2}>
            {item.description}
          </Text>
        )}
        <View style={styles.itemFooter}>
          <Text style={styles.itemPrice}>
            ₱{item.price?.toFixed(2) || (item.prices?.small.toFixed(2) + ' - ' + item.prices?.large.toFixed(2))}
          </Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddToCart(item)}
          >
            <Icon name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleAddToCart = (item: MenuItem) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price || item.prices?.small || 0,
      quantity: 1,
      size: item.prices ? ('small' as const) : undefined,
      temperature: 'cold' as const,
      image: item.image,
      note: '',
    };
    addToCart(cartItem);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search menu items..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9ca3af"
        />
      </View>

      <FlatList
        data={filteredItems}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.menuList}
      />
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
    padding: 16,
    paddingTop: 48,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  menuList: {
    padding: 16,
  },
  menuItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  itemImage: {
    width: '100%',
    height: 200,
  },
  itemContent: {
    padding: 16,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ec4899',
  },
  addButton: {
    backgroundColor: '#ec4899',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});