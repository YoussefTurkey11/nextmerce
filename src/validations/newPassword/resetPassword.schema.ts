import { z } from "zod";

export const emailSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .email(t("validations.email.invalid"))
      .min(1, t("validations.email.required")),
  });

export const otpSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email(),
    otp: z
      .string()
      .length(6, t("validations.otp.length"))
      .regex(/^\d+$/, t("validations.otp.digitsOnly")),
  });

export const passwordSchema = (t: (key: string) => string) =>
  z
    .object({
      email: z.string().email(),
      newPassword: z
        .string()
        .min(8, t("validations.password.min"))
        .regex(/[A-Z]/, t("validations.password.uppercase"))
        .regex(/[a-z]/, t("validations.password.lowercase"))
        .regex(/\d/, t("validations.password.number"))
        .regex(/[@$!%*?&]/, t("validations.password.special")),
      confirmNewPassword: z
        .string()
        .min(1, t("validations.password.confirmationRequired")),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: t("validations.password.notMatch"),
      path: ["confirmNewPassword"],
    });

export type EmailFormData = z.infer<ReturnType<typeof emailSchema>>;
export type OTPFormData = z.infer<ReturnType<typeof otpSchema>>;
export type PasswordFormData = z.infer<ReturnType<typeof passwordSchema>>;
