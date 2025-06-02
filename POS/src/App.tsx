import React, { useEffect, useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { MenuItems } from './components/MenuItems';
import { OrderSummary } from './components/OrderSummary';
import { TransactionHistory } from './components/TransactionHistory';
import { PaymentModal } from './components/PaymentModal';
import { AddItemModal } from './components/AddItemModal';
import { QRScanner } from './components/QRScanner';
import { ShoppingBagIcon, PlusCircleIcon, QrCodeIcon, CreditCardIcon } from 'lucide-react';
import { FontSizeProvider } from './contexts/FontSizeContext';
import { Toaster } from 'sonner';
import { toast } from 'sonner';
import { XIcon } from 'lucide-react';
import { User, MenuItem, CartItem, LoyaltyInfo, Transaction, Category, Section } from './types';

export function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [activeCategory, setActiveCategory] = useState<Category>('drinks');
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [menuItems, setMenuItems] = useState<{ [K in Category]: MenuItem[] }>({
    drinks: [{
      id: 1,
      name: 'Iced Coffee',
      price: 85,
      image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aWNlZCUyMGNvZmZlZXxlbnwwfHwwfHx8MA%3D%3D',
      category: 'drinks'
    }, {
      id: 2,
      name: 'Strawberry Milkshake',
      price: 120,
      image: 'https://images.unsplash.com/photo-1615478503562-ec2d8aa0e24e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHN0cmF3YmVycnklMjBtaWxrc2hha2V8ZW58MHx8MHx8fDA%3D',
      category: 'drinks'
    }, {
      id: 3,
      name: 'Matcha Latte',
      price: 110,
      image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWF0Y2hhJTIwbGF0dGV8ZW58MHx8MHx8fDA%3D',
      category: 'drinks'
    }],
    food: [{
      id: 4,
      name: 'Cheese Sandwich',
      price: 95,
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hlZXNlJTIwc2FuZHdpY2h8ZW58MHx8MHx8fDA%3D',
      category: 'food'
    }, {
      id: 5,
      name: 'Chocolate Muffin',
      price: 75,
      image: 'https://images.unsplash.com/photo-1599583863916-e06c29087f51?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hvY29sYXRlJTIwbXVmZmlufGVufDB8fDB8fHww',
      category: 'food'
    }, {
      id: 6,
      name: 'Caesar Salad',
      price: 150,
      image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Flc2FyJTIwc2FsYWR8ZW58MHx8MHx8fDA%3D',
      category: 'food'
    }]
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showTransactions, setShowTransactions] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLoyalty, setCurrentLoyalty] = useState<LoyaltyInfo | null>(null);

  const filteredItems = menuItems[activeCategory].filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      const category = item.category || (activeSection === 'drinks' ? 'drinks' : 'food');
      setCart([...cart, { ...item, quantity: 1, category }]);
    }
  };

  const removeFromCart = (itemId: number) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const updateItemQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const addMenuItem = (item: MenuItem) => {
    const newId = Math.max(...[...menuItems.drinks, ...menuItems.food].map(item => item.id), 0) + 1;
    const category = item.category || 'drinks';
    const newItem = { ...item, id: newId, category };
    setMenuItems({
      ...menuItems,
      [category]: [...menuItems[category], newItem]
    });
    setShowAddItemModal(false);
  };

  const handleQRScan = (data: { loyaltyInfo?: LoyaltyInfo; items?: CartItem[] }) => {
    try {
      if (data.loyaltyInfo) {
        setCurrentLoyalty(data.loyaltyInfo);
        toast.success(`Welcome back, ${data.loyaltyInfo.customerName}!`);
      }
      if (data.items && data.items.length > 0) {
        setCart([...cart, ...data.items]);
        toast.success('Order items added to cart');
      }
    } catch (error) {
      console.error('Invalid QR data', error);
      toast.error('Could not process QR code');
    }
    setShowQRScanner(false);
  };

  const addTransaction = (cart: CartItem[], paymentMethod: string, total: number, loyaltyId?: string) => {
    const categoryTotals = cart.reduce((acc, item) => {
      const category = item.category || 'uncategorized';
      acc[category] = (acc[category] || 0) + item.price * item.quantity;
      return acc;
    }, {} as { [key: string]: number });

    const newTransaction: Transaction = {
      id: Date.now(),
      date: new Date(),
      items: cart,
      total,
      categoryTotals,
      paymentMethod,
      loyaltyId
    };

    const savedTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const updatedTransactions = [newTransaction, ...savedTransactions];
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    setTransactions(updatedTransactions);
  };

  const handlePaymentComplete = (paymentMethod: string) => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    if (currentLoyalty) {
      const pointsEarned = Math.floor(total);
      toast.success(`Earned ${pointsEarned} loyalty points!`);
    }

    const drinkTotal = cart
      .filter(item => item.category === 'drinks')
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    const foodTotal = cart
      .filter(item => item.category === 'food')
      .reduce((sum, item) => sum + item.price * item.quantity, 0);

    addTransaction(cart, paymentMethod, total, currentLoyalty?.loyaltyId);

    toast.success(
      <div>
        <p>Payment completed successfully!</p>
        {drinkTotal > 0 && <p>Drinks total: ₱{drinkTotal.toFixed(2)}</p>}
        {foodTotal > 0 && <p>Food total: ₱{foodTotal.toFixed(2)}</p>}
      </div>
    );

    setCart([]);
    setCurrentLoyalty(null);
    setShowPaymentModal(false);
  };

  const handleAddItem = () => {
    setShowAddItemModal(true);
  };

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem('transactions') || '[]') as Transaction[];
    setTransactions(savedTransactions);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setActiveSection('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard transactions={transactions} onAddItem={handleAddItem} />;
      case 'drinks':
      case 'food':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                {currentLoyalty && (
                  <div className="mb-4 bg-pink-50 p-4 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">
                        {currentLoyalty.customerName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Loyalty Points: {currentLoyalty.points}
                      </p>
                    </div>
                    <button
                      onClick={() => setCurrentLoyalty(null)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <XIcon size={20} />
                    </button>
                  </div>
                )}
                <div className="mb-6">
                  <input
                    type="text"
                    placeholder="Search menu items..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  />
                </div>
                <MenuItems
                  items={filteredItems}
                  addToCart={addToCart}
                  onAddItem={handleAddItem}
                  onScanQR={() => setShowQRScanner(true)}
                />
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <OrderSummary
                cart={cart}
                updateItemQuantity={updateItemQuantity}
                removeFromCart={removeFromCart}
                onCancel={() => setCart([])}
              />
              {cart.length > 0 && (
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="w-full mt-4 bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors duration-200"
                >
                  Process Payment
                </button>
              )}
            </div>
          </div>
        );
      case 'history':
        return <TransactionHistory transactions={transactions} />;
      default:
        return null;
    }
  };

  return (
    <FontSizeProvider>
      {!user ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <>
          <Layout
            user={user}
            onLogout={handleLogout}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          >
            {renderContent()}
            {showAddItemModal && (
              <AddItemModal
                onClose={() => setShowAddItemModal(false)}
                onAdd={addMenuItem}
              />
            )}
            {showQRScanner && (
              <QRScanner
                onClose={() => setShowQRScanner(false)}
                onScan={handleQRScan}
              />
            )}
            {showPaymentModal && (
              <PaymentModal
                onClose={() => setShowPaymentModal(false)}
                cart={cart}
                onComplete={handlePaymentComplete}
              />
            )}
          </Layout>
          <Toaster position="top-right" />
        </>
      )}
    </FontSizeProvider>
  );
}