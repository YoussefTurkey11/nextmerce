import { TProductItem } from "./product";

export type TCartItems = {
  id: string;
  product: TProductItem;
  price: number;
  quantity: number;
};

export type TCart = {
  id: string;
  user: string;
  cartItems: TCartItems[];
  totalPrice: number;
  totalPriceAfterDiscount: number;
};

export type TCartResponse = {
  results: number;
  message: string;
  data: TCart;
};
