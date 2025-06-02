export type Category = 'drinks' | 'food';
export type Section = 'dashboard' | Category | 'history';

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: Category;
}

export interface CartItem extends MenuItem {
  quantity: number;
  category: Category;
}

export interface User {
  name: string;
  role: 'admin' | 'staff';
}

export interface LoyaltyInfo {
  loyaltyId: string;
  customerName: string;
  points: number;
}

export interface Transaction {
  id: number;
  date: Date;
  items: CartItem[];
  total: number;
  categoryTotals: {
    [key: string]: number;
  };
  paymentMethod: string;
  loyaltyId?: string;
} 