export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price?: number;
  prices?: {
    small: number;
    medium: number;
    large: number;
  };
  category: string;
  image?: string;
}

export interface OrderConfirmation {
  orderNumber: string;
  estimatedTime: string;
  items: OrderItem[];
  total: number;
  points: number;
}

export interface OrderItem {
  name: string;
  quantity: number;
  size?: 'small' | 'large';
  price: number;
}

export interface MenuSection {
  section: string;
  items: MenuItem[];
}

export interface MenuData {
  sections: MenuSection[];
}