import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import type { RootStackScreenProps } from '../../App';

type PaymentMethodsScreenProps = RootStackScreenProps<'PaymentMethods'>;

export const PaymentMethodsScreen: React.FC<PaymentMethodsScreenProps> = ({
  navigation,
}) => {
  const paymentMethods = [
    {
      id: '1',
      type: 'card',
      last4: '4242',
      expiry: '12/24',
      brand: 'Visa',
    },
    {
      id: '2',
      type: 'card',
      last4: '8888',
      expiry: '08/25',
      brand: 'Mastercard',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved Cards</Text>
          {paymentMethods.map(method => (
            <TouchableOpacity
              key={method.id}
              style={styles.paymentMethod}
              onPress={() => {}}
            >
              <View style={styles.cardIcon}>
                <Icon
                  name={method.brand.toLowerCase() === 'visa' ? 'credit-card' : 'credit-card'}
                  size={24}
                  color="#374151"
                />
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardBrand}>
                  {method.brand} ending in {method.last4}
                </Text>
                <Text style={styles.cardExpiry}>Expires {method.expiry}</Text>
              </View>
              <Icon name="more-vertical" size={20} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Icon name="plus" size={20} color="#ec4899" />
          <Text style={styles.addButtonText}>Add New Card</Text>
        </TouchableOpacity>

        <View style={styles.infoSection}>
          <Icon name="shield" size={20} color="#6b7280" />
          <Text style={styles.infoText}>
            Your payment information is securely stored and encrypted.
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
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    marginBottom: 12,
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  cardBrand: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  cardExpiry: {
    fontSize: 14,
    color: '#6b7280',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#fce7f3',
    borderRadius: 8,
  },
  addButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#ec4899',
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