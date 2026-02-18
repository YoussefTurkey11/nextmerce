import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "@/redux/store";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth?.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Users", "Auth", "Products", "Categories", "Carts"],
  refetchOnFocus: false,
  refetchOnReconnect: false,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
