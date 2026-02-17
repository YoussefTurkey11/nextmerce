export type TProductItem = {
  id: string;
  img: string;
  imgGroup: string[];
  link: string;
  title: string;
  price: { num: number; head: string };
  oldPrice: { num: number; head: string };
  desc: string;
  rating: { num: number; head: string };
  reviews: { num: number; head: string };
  stock: "In Stock" | "Out of Stock";
  quantity: string;
  badge: string;
};
