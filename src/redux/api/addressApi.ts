import {
  TAddressResponse,
  TCreateAddressBody,
  TCreateAddressResponse,
  TDeleteAddressResponse,
} from "@/types/address";
import { api } from "../baseApi";

export const addressApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Addresses
    getAllAddresses: builder.query<TAddressResponse, void>({
      query: () => `/api/v1/addresses`,
      providesTags: [{ type: "Addresses", id: "LIST" }],
    }),

    // Create Addresses
    createAddresses: builder.mutation<
      TCreateAddressResponse,
      TCreateAddressBody
    >({
      query: (body) => ({
        url: `/api/v1/addresses`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Addresses", id: "LIST" }],
    }),

    // Delete Addresses
    deleteAddresses: builder.mutation<TDeleteAddressResponse, string>({
      query: (id) => ({
        url: `/api/v1/addresses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Addresses", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllAddressesQuery,
  useCreateAddressesMutation,
  useDeleteAddressesMutation,
} = addressApi;
