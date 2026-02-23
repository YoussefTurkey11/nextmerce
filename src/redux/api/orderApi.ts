import {
  TCashOrderResponse,
  TCheckoutSessionPaymob,
  TCheckoutSessionStrapi,
  TCreateOrderResponse,
  TGetAllOrdersResponse,
  TUpdateOrderBody,
} from "@/types/order";
import { api } from "../baseApi";

export const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Orders
    getAllOrders: builder.query<TGetAllOrdersResponse, number>({
      query: (page = 1) => `/api/v1/orders?page=${page}&limit=5`,
      providesTags: [{ type: "Orders", id: "LIST" }],
    }),

    getSingleOrder: builder.query<TGetAllOrdersResponse, void>({
      query: () => `/api/v1/orders`,
      providesTags: [{ type: "Orders", id: "LIST" }],
    }),

    // Check Out Session - Stripe
    checkOutSessionStripe: builder.query<TCheckoutSessionStrapi, string>({
      query: (cartId) => `/api/v1/orders/stripe-checkout-session/${cartId}`,
      providesTags: [{ type: "Orders", id: "LIST" }],
    }),

    // Check Out Session - Paymob
    checkOutSessionPaymob: builder.query<TCheckoutSessionPaymob, string>({
      query: (cartId) => `/api/v1/orders/payMob-checkout-session/${cartId}`,
      providesTags: [{ type: "Orders", id: "LIST" }],
    }),

    // Create Cash Order
    createCashOrder: builder.mutation<TCashOrderResponse, { cartId: string }>({
      query: ({ cartId }) => ({
        url: `/api/v1/orders/${cartId}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Orders", id: "LIST" }],
    }),

    // Update Order Status
    updateOrderStatus: builder.mutation<
      TCreateOrderResponse,
      { orderId: string; body: TUpdateOrderBody }
    >({
      query: ({ orderId, body }) => ({
        url: `/api/v1/orders/${orderId}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "Orders", id: "LIST" }],
    }),

    // Delete Order
    deleteOrder: builder.mutation<{ message: string }, string>({
      query: (orderId) => ({
        url: `/api/v1/orders/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Orders", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetSingleOrderQuery,
  useCheckOutSessionStripeQuery,
  useCheckOutSessionPaymobQuery,
  useCreateCashOrderMutation,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
} = orderApi;
