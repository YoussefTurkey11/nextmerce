export type TCreateOrderResponse = {
  message: string;
  data: { data: TOrder };
};

export type TOrder = {
  id: string;
  orderNumber: string;
  customer:
    | {
        name: string;
        email: string;
        addresses: string[];
      }
    | string;
  items: TItem[];
  cartPrice: number;
  taxes: number;
  shipping: number;
  totalOrderPrice: number;
  status: TItemState;
  paymentMethod: string;
  isPaid: boolean;
  createdAt: string;
};

export type TItem = {
  id: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    title?: string;
    imageCover?: string;
  };
};

export type TGetAllOrdersResponse = {
  message: string;
  data: {
    results: number;
    data: TOrder[];
    paginationResult: {
      currentPage: number;
      limit: number;
      totalPages: number;
    };
  };
};

export type TUpdateOrderBody = {
  isPaid: boolean;
  status: TItemState;
};

export type TItemState =
  | "pending"
  | "paid"
  | "shipped"
  | "delivered"
  | "cancelled";

export type TCheckoutSessionResponse = {
  status: string;
  session?: {
    id: string;
    url: string;
  };
};
