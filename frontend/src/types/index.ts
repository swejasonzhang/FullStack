export interface User {
  id: number;
  email: string;
  username: string;
  created_at: string;
  updated_at: string;
}

export interface Item {
  id: number;
  name: string;
  cost: number;
  category: string;
  stock: number;
  description: string;
  imageUrl: string | null;
}

export interface CartItem {
  id?: number;
  item_id: number;
  user_id: number;
  name: string;
  cost: number;
  description: string;
  image_url: string;
  quantity: number;
}

export interface Review {
  id?: number;
  item_id: number;
  ratings: number;
  body: string;
  author: string;
}

export type ItemsById = Record<number, Item>;
export type CartItemsById = Record<number, CartItem>;
export type ReviewsById = Record<number, Review>;
