import { z } from "zod";

export const cartCouponSchema = (t: (key: string) => string) =>
  z.object({
    coupon: z.string().trim().optional(),
  });
export type CartCouponFormDataSchema = z.infer<
  ReturnType<typeof cartCouponSchema>
>;
