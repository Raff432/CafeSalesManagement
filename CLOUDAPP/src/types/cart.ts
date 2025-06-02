export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: 'small' | 'large';
  temperature?: 'hot' | 'cold';
  image?: string;
  note: string;
  points?: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  points: number;
  favorites: CartItem[];
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'points'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_FAVORITE'; payload: CartItem }; 