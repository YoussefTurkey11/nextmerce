import { parsePhoneNumber } from "libphonenumber-js/min";
import { z } from "zod";

export const detailsSchema = (t: (key: string) => string) =>
  z.object({
    name: z
      .string()
      .min(1, t("profile.validation.required"))
      .max(255, t("profile.validation.nameMax"))
      .trim(),
    email: z
      .string()
      .email(t("profile.validation.invalidEmail"))
      .min(1, t("profile.validation.required"))
      .trim()
      .toLowerCase(),
    phone: z
      .string()
      .min(1, t("profile.validation.phoneRequired"))
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
          message: t("profile.validation.invalidPhone"),
        },
      ),
    profileImage: z.any().optional(),
  });

export type DetailsFormDataSchema = z.infer<ReturnType<typeof detailsSchema>>;
