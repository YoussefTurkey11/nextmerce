import { z } from "zod";

export const cartCouponSchema = (t: (key: string) => string) =>
  z.object({
    coupon: z.string().min(1, t("response.require")).trim(),
  });
export type CartCouponFormDataSchema = z.infer<
  ReturnType<typeof cartCouponSchema>
>;
