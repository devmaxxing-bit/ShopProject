export interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: number;
  category_name?: string;
  stock: number;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface OrderItem {
  id: number;
  product: number;
  product_name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  user: number;
  shipping_name: string;
  phone: string;
  address: string;
  status: string;
  total_price: number;
  created_at: string;
  items: OrderItem[];
}
