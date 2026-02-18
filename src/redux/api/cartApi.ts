import { TCartResponse } from "@/types/cart";
import { api } from "../baseApi";

export const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Products In Cart
    getAllProductsInCart: builder.query<TCartResponse, void>({
      query: () => `/api/v1/carts`,
      providesTags: [{ type: "Carts", id: "LIST" }],
    }),

    // Add Products To Cart
    addProductsToCart: builder.mutation<TCartResponse, { productId: string }>({
      query: (body) => ({
        url: `/api/v1/carts`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Carts", id: "LIST" }],
    }),

    // Update Quantity In Cart
    updateQuantityInCart: builder.mutation<
      TCartResponse,
      { id: string; quantity: number }
    >({
      query: ({ id, quantity }) => ({
        url: `/api/v1/carts/${id}`,
        method: "PUT",
        body: { quantity },
      }),
      invalidatesTags: [{ type: "Carts", id: "LIST" }],
    }),

    // Apply Coupon In Cart
    applyCouponInCart: builder.mutation<TCartResponse, { code: string }>({
      query: ({ code }) => ({
        url: `/api/v1/carts/applyCoupon`,
        method: "PUT",
        body: { code },
      }),
      invalidatesTags: [{ type: "Carts", id: "LIST" }],
    }),

    // Delete Products In Cart
    deleteProductsInCart: builder.mutation<TCartResponse, string>({
      query: (id) => ({
        url: `/api/v1/carts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Carts", id: "LIST" }],
    }),

    // Clear Cart Content
    clearCartContent: builder.mutation<void, void>({
      query: () => ({
        url: `/api/v1/carts`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Carts", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllProductsInCartQuery,
  useLazyGetAllProductsInCartQuery,
  useAddProductsToCartMutation,
  useUpdateQuantityInCartMutation,
  useApplyCouponInCartMutation,
  useDeleteProductsInCartMutation,
  useClearCartContentMutation,
} = cartApi;
