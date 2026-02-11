"use client";
import { InputField } from "@/components/common/InputField";
import { TInputType } from "@/types/authTypes";
import { LoginFormDataSchema } from "@/validations/login/login.schema";
import { LockKeyhole, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { FieldErrors, UseFormRegister } from "react-hook-form";

const LoginFormData = ({
  register,
  errors,
}: {
  register: UseFormRegister<LoginFormDataSchema>;
  errors: FieldErrors<LoginFormDataSchema>;
}) => {
  const t = useTranslations("Auth.login");

  const loginFormData = t.raw("formData") as Array<{
    id: keyof LoginFormDataSchema;
    label: string;
    placeholder: string;
    type: Exclude<TInputType, "phone">;
  }>;

  return (
    <>
      {loginFormData.length > 0 &&
        loginFormData.map((field) => (
          <InputField
            key={field.id}
            name={field.id}
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
            register={register(field.id)}
            errors={errors}
            icon={
              field.type === "email" ? (
                <Mail />
              ) : field.type === "password" ? (
                <LockKeyhole />
              ) : null
            }
          />
        ))}
    </>
  );
};

export default LoginFormData;
