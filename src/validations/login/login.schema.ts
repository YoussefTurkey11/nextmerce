import { z } from "zod";

export const loginSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .email(t("validation.invalidEmail"))
      .min(1, t("validation.required"))
      .trim()
      .toLowerCase(),
    password: z.string().min(6, t("validation.passwordMin")),
  });

export type LoginFormDataSchema = z.infer<ReturnType<typeof loginSchema>>;
