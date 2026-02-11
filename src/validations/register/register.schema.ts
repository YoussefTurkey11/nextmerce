import { parsePhoneNumber } from "libphonenumber-js/min";
import { z } from "zod";

export const registerSchema = (t: (key: string) => string) =>
  z
    .object({
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
      password: z
        .string()
        .min(9, t("validation.passwordMin"))
        .regex(/[a-z]/, t("validation.passwordLowercase"))
        .regex(/[A-Z]/, t("validation.passwordUppercase"))
        .regex(/[0-9]/, t("validation.passwordNumber"))
        .regex(/[^a-zA-Z0-9]/, t("validation.passwordSpecial")),
      passwordConfirmation: z
        .string()
        .min(1, t("validation.passwordConfirmationRequired")),
      phone: z
        .string()
        .min(1, t("validation.phoneRequired"))
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
            message: t("validation.invalidPhone"),
          },
        ),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: t("validation.passwordsNotMatch"),
      path: ["passwordConfirmation"],
    });

export type RegisterFormDataSchema = z.infer<ReturnType<typeof registerSchema>>;
