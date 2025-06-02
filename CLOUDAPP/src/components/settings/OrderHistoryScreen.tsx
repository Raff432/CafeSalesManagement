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
import type { RootStackScreenProps } from '../../App';

type OrderHistoryScreenProps = RootStackScreenProps<'OrderHistory'>;

export const OrderHistoryScreen: React.FC<OrderHistoryScreenProps> = ({
  navigation,
}) => {
  const currentOrder = {
    name: 'Caramel Macchiato',
    orderNumber: '#12345',
    status: 'Ready for Pickup',
    orderTime: '10:30 AM',
    total: '₱180',
  };

  const pastOrders = [
    {
      name: 'Vanilla Latte',
      orderNumber: '#12344',
      date: 'Yesterday, 2:15 PM',
      status: 'Completed',
      price: '₱160',
      image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
    },
    {
      name: 'Espresso',
      orderNumber: '#12343',
      date: 'Oct 15, 9:30 AM',
      status: 'Completed',
      price: '₱120',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
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
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Current Order */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Order</Text>
          <View style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View style={styles.orderIcon}>
                <Icon name="coffee" size={24} color="#ec4899" />
              </View>
              <View style={styles.orderInfo}>
                <Text style={styles.orderName}>{currentOrder.name}</Text>
                <Text style={styles.orderNumber}>{currentOrder.orderNumber}</Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{currentOrder.status}</Text>
              </View>
            </View>
            <View style={styles.orderDetails}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Status</Text>
                <Text style={styles.detailValueGreen}>Ready</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Order Time</Text>
                <Text style={styles.detailValue}>{currentOrder.orderTime}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Total</Text>
                <Text style={styles.detailValue}>{currentOrder.total}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Past Orders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Past Orders</Text>
          <View style={styles.pastOrdersContainer}>
            {pastOrders.map((order, index) => (
              <View
                key={index}
                style={[
                  styles.pastOrderCard,
                  index < pastOrders.length - 1 && styles.pastOrderBorder,
                ]}
              >
                <View style={styles.pastOrderContent}>
                  <Image
                    source={{ uri: order.image }}
                    style={styles.pastOrderImage}
                  />
                  <View style={styles.pastOrderInfo}>
                    <View style={styles.pastOrderHeader}>
                      <View>
                        <Text style={styles.pastOrderName}>{order.name}</Text>
                        <Text style={styles.pastOrderNumber}>
                          {order.orderNumber}
                        </Text>
                      </View>
                      <Text style={styles.pastOrderPrice}>{order.price}</Text>
                    </View>
                    <View style={styles.pastOrderStatus}>
                      <Icon name="check-circle" size={14} color="#10b981" />
                      <Text style={styles.pastOrderStatusText}>
                        {order.status}
                      </Text>
                      <Text style={styles.pastOrderDot}>•</Text>
                      <Text style={styles.pastOrderDate}>{order.date}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fce7f3',
  },
  header: {
    backgroundColor: '#ec4899',
    padding: 16,
    paddingTop: 40,
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
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fce7f3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderInfo: {
    marginLeft: 12,
    flex: 1,
  },
  orderName: {
    fontSize: 16,
    fontWeight: '500',
  },
  orderNumber: {
    fontSize: 14,
    color: '#6b7280',
  },
  statusBadge: {
    backgroundColor: '#d1fae5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  statusText: {
    color: '#059669',
    fontSize: 12,
    fontWeight: '500',
  },
  orderDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  detailValue: {
    fontSize: 14,
  },
  detailValueGreen: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
  },
  pastOrdersContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  pastOrderCard: {
    padding: 16,
  },
  pastOrderBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  pastOrderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pastOrderImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  pastOrderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  pastOrderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  pastOrderName: {
    fontSize: 16,
    fontWeight: '500',
  },
  pastOrderNumber: {
    fontSize: 14,
    color: '#6b7280',
  },
  pastOrderPrice: {
    fontSize: 16,
    fontWeight: '500',
  },
  pastOrderStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  pastOrderStatusText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
  },
  pastOrderDot: {
    fontSize: 14,
    color: '#9ca3af',
    marginHorizontal: 4,
  },
  pastOrderDate: {
    fontSize: 14,
    color: '#6b7280',
  },
});