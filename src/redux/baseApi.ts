import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthCookie } from "@/utils/cookie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getAuthCookie();
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: [
    "Users",
    "Auth",
    "Products",
    "Categories",
    "Carts",
    "Wishlists",
    "Orders",
    "Addresses",
  ],
  refetchOnFocus: false,
  refetchOnReconnect: false,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
