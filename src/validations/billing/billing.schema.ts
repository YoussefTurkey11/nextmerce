import { parsePhoneNumber } from "libphonenumber-js/min";
import { z } from "zod";

export const billingSchema = (t: (key: string) => string) =>
  z.object({
    name: z
      .string()
      .min(1, t("validation.required"))
      .max(255, t("validation.nameMax"))
      .trim(),
    email: z
      .string()
      .email(t("validation.invalidEmail"))
      .min(1, t("validation.required"))
      .trim()
      .toLowerCase(),
    country: z.string().min(1, t("validation.required")),
    city: z.string().min(1, t("validation.required")),
    postalCode: z.string().min(3, t("validation.required")),
    phone: z
      .string()
      .min(1, t("address.phone.phoneRequired"))
      .refine(
        (value) => {
          try {
            const phoneNumber = parsePhoneNumber(value);
            return phoneNumber?.isValid() || false;
          } catch {
            return false;
          }
        },
        {
          message: t("address.phone.invalidPhone"),
        },
      ),
    coupon: z.string().min(1, t("response.require")).trim(),
  });

export type BillingFormDataSchema = z.infer<ReturnType<typeof billingSchema>>;
