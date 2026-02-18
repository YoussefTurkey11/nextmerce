import { TProductItem } from "./product";

export type TWishlistResponse = {
  results: number;
  message: string;
  data: TProductItem[];
};
