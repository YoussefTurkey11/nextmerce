"use client";
import { InputField } from "@/components/common/InputField";
import { TInputType } from "@/types/authTypes";
import { ForgotPasswordFormDataSchema } from "@/validations/forgotPassword/forgotPassword.schema";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { FieldErrors, UseFormRegister } from "react-hook-form";

const ForgotPasswordFormData = ({
  register,
  errors,
}: {
  register: UseFormRegister<ForgotPasswordFormDataSchema>;
  errors: FieldErrors<ForgotPasswordFormDataSchema>;
}) => {
  const t = useTranslations("Auth.forgotPassword");

  const forgotPasswordFormData = t.raw("formData") as Array<{
    id: keyof ForgotPasswordFormDataSchema;
    label: string;
    placeholder: string;
    type: TInputType;
  }>;

  return (
    <>
      {forgotPasswordFormData.length > 0 &&
        forgotPasswordFormData.map((field) => (
          <InputField
            key={field.id}
            name={field.id}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
            register={register(field.id)}
            errors={errors}
            icon={<Mail />}
          />
        ))}
    </>
  );
};

export default ForgotPasswordFormData;
