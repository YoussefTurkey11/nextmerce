export type TProductItem = {
  id: string;
  title: string;
  description: string;
  quantity: number;
  sold: number;
  price: number;
  discountPercentage: number;
  priceAfterDiscount: number;
  imageCover: string;
  images: string[];
  category: string;
  subCategories: string[];
  ratingsQuantity: number;
  createdAt: string;
  updatedAt: string;
  reviews: string[];
};

export type TProductCard = {
  id: string;
  title: string;
  img: string;
  link: string;
  price: {
    num: number;
  };
  oldPrice: {
    num: number;
  };
};

export type CartItem = TProductItem & {
  quantity: number;
};
export type WishlistItem = TProductItem & {
  quantity: number;
};

export type ProductQueryParams = {
  page?: number;
  limit?: number;
};

export type ProductResponse = {
  message: string;
  results: number;
  data: TProductItem[];
  paginationResult: TPagination;
};

export type TPagination = {
  currentPage: number;
  limit: number;
  totalPages: number;
  next?: number;
};
