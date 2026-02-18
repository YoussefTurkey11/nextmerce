import { TWishlistResponse } from "@/types/wishlist";
import { api } from "../baseApi";

export const wishlistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Wishlists
    getAllWishlists: builder.query<TWishlistResponse, void>({
      query: () => `/api/v1/wishlists`,
      providesTags: [{ type: "Wishlists", id: "LIST" }],
    }),

    // Create Wishlist
    createWishlist: builder.mutation<TWishlistResponse, { productId: string }>({
      query: (body) => ({
        url: `/api/v1/wishlists`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Wishlists", id: "LIST" }],
    }),

    // Delete Wishlist
    deleteWishlist: builder.mutation<TWishlistResponse, string>({
      query: (id) => ({
        url: `/api/v1/wishlists/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Wishlists", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllWishlistsQuery,
  useLazyGetAllWishlistsQuery,
  useCreateWishlistMutation,
  useDeleteWishlistMutation,
} = wishlistApi;
