import { api } from "../baseApi";
import {
  CategoryQueryParams,
  CategoryResponse,
  TCategory,
} from "@/types/category";

const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Categories
    getAllCategories: builder.query<CategoryResponse, CategoryQueryParams>({
      query: ({ page = 1, limit = 10 }) =>
        `/api/v1/categories?page=${page}&limit=${limit}`,
      providesTags: ["Categories"],
    }),

    // Get Specific Category
    getSpecificCategory: builder.query({
      query: (id) => `/api/v1/categories/${id}`,
      providesTags: ["Categories"],
    }),

    // Create Category
    createCategory: builder.mutation({
      query: (body) => ({
        url: `/api/v1/categories`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Categories"],
    }),

    // Update Category
    updateCategory: builder.mutation<TCategory, { id: string; data: FormData }>(
      {
        query: ({ id, data }) => ({
          url: `/api/v1/categories/${id}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["Categories"],
      },
    ),

    // Delete Category
    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/v1/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetSpecificCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
