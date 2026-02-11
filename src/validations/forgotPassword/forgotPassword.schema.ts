import { z } from "zod";

export const forgotPasswordSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .email(t("validation.invalidEmail"))
      .min(1, t("validation.required"))
      .trim()
      .toLowerCase(),
  });

export type ForgotPasswordFormDataSchema = z.infer<
  ReturnType<typeof forgotPasswordSchema>
>;
