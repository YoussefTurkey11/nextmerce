"use client";
import { InputField } from "@/components/common/InputField";
import { TInputType } from "@/types/authTypes";
import { RegisterFormDataSchema } from "@/validations/register/register.schema";
import { LockKeyhole, Mail, UserRound } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

const RegisterFormData = ({
  register,
  errors,
  control,
  phoneValue,
  setValue,
  isSubmitting,
}: {
  register: UseFormRegister<RegisterFormDataSchema>;
  errors: FieldErrors<RegisterFormDataSchema>;
  control: Control<RegisterFormDataSchema>;
  phoneValue: string;
  setValue: UseFormSetValue<RegisterFormDataSchema>;
  isSubmitting: boolean;
}) => {
  const t = useTranslations("Auth.register");

  const registerFormData = t.raw("formData") as Array<{
    id: keyof RegisterFormDataSchema;
    label: string;
    placeholder: string;
    type: TInputType;
  }>;

  return (
    <>
      {registerFormData.map((field) => (
        <div key={field.id} className="w-full">
          {field.type === "phone" ? (
            <InputField
              type="phone"
              label={field.label}
              placeholder={field.placeholder}
              phoneValue={phoneValue}
              onPhoneChange={(value) =>
                setValue("phone", value, { shouldValidate: true })
              }
              errors={errors}
              isSubmitting={isSubmitting}
            />
          ) : (
            <InputField
              type={field.type}
              name={field.id}
              label={field.label}
              placeholder={field.placeholder}
              register={register(field.id)}
              errors={errors}
              control={control}
              isSubmitting={isSubmitting}
              icon={
                field.type === "email" ? (
                  <Mail size={18} />
                ) : field.type === "password" ? (
                  <LockKeyhole size={18} />
                ) : (
                  <UserRound size={18} />
                )
              }
            />
          )}
        </div>
      ))}
    </>
  );
};

export default RegisterFormData;
