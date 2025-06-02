import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useCart } from '../contexts/CartContext';
import type { CartItem } from '../types/cart';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { ParamListBase } from '@react-navigation/native';

interface TabParamList extends ParamListBase {
  Cart: undefined;
  Menu: undefined;
  Checkout: undefined;
}

type CheckoutScreenProps = BottomTabScreenProps<TabParamList, 'Checkout'>;

interface PaymentMethod {
  id: string;
  type: 'card' | 'cash';
  label: string;
  icon: string;
  last4?: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'cash',
    type: 'cash',
    label: 'Cash',
    icon: 'dollar-sign',
  },
  {
    id: 'card1',
    type: 'card',
    label: 'Credit Card',
    icon: 'credit-card',
    last4: '4242',
  },
];

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ navigation }) => {
  const { state, clearCart } = useCart();
  const [selectedPayment, setSelectedPayment] = useState<string>(paymentMethods[0].id);
  const [note, setNote] = useState('');

  const handlePlaceOrder = () => {
    // In a real app, you would handle the payment processing here
    Alert.alert(
      'Order Placed',
      'Your order has been placed successfully!',
      [
        {
          text: 'OK',
          onPress: () => {
            clearCart();
            navigation.navigate('Menu');
          },
        },
      ]
    );
  };

  const renderOrderItem = (item: CartItem) => (
    <View style={styles.orderItem} key={item.id}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDetails}>
          {item.size && `${item.size} • `}
          {item.temperature && `${item.temperature} • `}
          Qty: {item.quantity}
        </Text>
      </View>
      <Text style={styles.itemPrice}>₱{(item.price * item.quantity).toFixed(2)}</Text>
    </View>
  );

  const renderPaymentMethod = (method: PaymentMethod) => (
    <TouchableOpacity
      key={method.id}
      style={[
        styles.paymentMethod,
        selectedPayment === method.id && styles.paymentMethodSelected,
      ]}
      onPress={() => setSelectedPayment(method.id)}
    >
      <Icon
        name={method.icon}
        size={24}
        color={selectedPayment === method.id ? '#ec4899' : '#6b7280'}
      />
      <View style={styles.paymentMethodInfo}>
        <Text
          style={[
            styles.paymentMethodLabel,
            selectedPayment === method.id && styles.paymentMethodLabelSelected,
          ]}
        >
          {method.label}
        </Text>
        {method.last4 && (
          <Text style={styles.paymentMethodDetails}>•••• {method.last4}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-left" size={24} color="#1f2937" />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.orderList}>
            {state.items.map(item => renderOrderItem(item))}
          </View>
          <View style={styles.orderTotal}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>₱{state.total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentMethods}>
            {paymentMethods.map(method => renderPaymentMethod(method))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Additional Notes</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="Add notes for your order..."
            placeholderTextColor="#9ca3af"
            value={note}
            onChangeText={setNote}
            multiline
            numberOfLines={3}
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.placeOrderButtonText}>Place Order</Text>
          <Icon name="arrow-right" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#1f2937',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  orderList: {
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  itemDetails: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 16,
  },
  orderTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  totalLabel: {
    fontSize: 16,
    color: '#6b7280',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  paymentMethods: {
    gap: 12,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#f3f4f6',
  },
  paymentMethodSelected: {
    borderColor: '#ec4899',
    backgroundColor: '#fdf2f8',
  },
  paymentMethodInfo: {
    marginLeft: 12,
  },
  paymentMethodLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  paymentMethodLabelSelected: {
    color: '#ec4899',
  },
  paymentMethodDetails: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  noteInput: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#1f2937',
    height: 100,
    textAlignVertical: 'top',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  placeOrderButton: {
    backgroundColor: '#ec4899',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  placeOrderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});