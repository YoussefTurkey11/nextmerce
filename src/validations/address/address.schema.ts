import { parsePhoneNumber } from "libphonenumber-js/min";
import { z } from "zod";

export const addressSchema = (t: (key: string) => string) =>
  z.object({
    alias: z.string().min(1, t("address.required")),
    details: z
      .string()
      .min(10, t("address.details.min"))
      .max(40, t("address.details.max")),
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
    country: z.string().min(1, t("address.required")),
    city: z.string().min(1, t("address.required")),
    postalCode: z.string().min(3, t("address.required")),
  });

export type AddressDataSchema = z.infer<ReturnType<typeof addressSchema>>;
