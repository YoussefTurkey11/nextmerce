import { TProductItem } from "@/types/product";

export const rating = (star: TProductItem) => Math.min(star.ratingsQuantity, 5);
