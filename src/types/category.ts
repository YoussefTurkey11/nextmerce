export type TCategory = {
  id: string;
  name: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
};

export type CategoryQueryParams = {
  page?: number;
  limit?: number;
};

export type CategoryResponse = {
  message: string;
  results: number;
  data: { data: TCategory[] };
  paginationResult: {
    currentPage: number;
    limit: number;
    totalPages: number;
  };
};
