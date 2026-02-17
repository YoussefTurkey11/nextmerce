import {
  ProductsQueryParams,
  ProductsResponse,
  TProductItem,
} from "@/types/product";
import { api } from "../baseApi";

export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get Products
    getProducts: builder.query<ProductsResponse, ProductsQueryParams>({
      query: ({ page = 1, limit = 10 }) =>
        `/api/v1/products?page=${page}&limit=${limit}`,
      providesTags: ["Products"],
    }),

    // Get Specific Product
    getSpecificProduct: builder.query({
      query: (id) => `/api/v1/products/${id}`,
      providesTags: ["Products"],
    }),

    // Create Product
    createProduct: builder.mutation<TProductItem, FormData>({
      query: (body) => ({
        url: `/api/v1/products/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),

    // Update Product
    updateProduct: builder.mutation<
      TProductItem,
      { id: string; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/api/v1/products/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),

    // Delete Product
    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/v1/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSpecificProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
