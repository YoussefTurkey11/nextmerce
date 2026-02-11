"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import {
  passwordSchema,
  PasswordFormData,
} from "@/validations/newPassword/resetPassword.schema";
import toast from "react-hot-toast";
import { useLocale, useTranslations } from "next-intl";
import { TInputType } from "@/types/authTypes";
import { InputField } from "@/components/common/InputField";
import Title from "@/components/common/Title";

const NewPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const otp = searchParams.get("otp") || "";
  const t = useTranslations("Auth.newPassword");
  const locale = useLocale();

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const newPasswordFormFields = t.raw("formFields") as Array<{
    id: string;
    name: keyof PasswordFormData;
    label: string;
    type: TInputType;
    placeholder: string;
    description?: string;
    required: boolean;
  }>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    reset,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema(t)),
    defaultValues: {
      email,
      otp,
      password: "",
      passwordConfirmation: "",
    },
  });

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  // Validate URL parameters
  useEffect(() => {
    if (!email || !otp) {
      toast.error(t("invalidLink"));
      router.push(`/${locale}/forgetPassword`);
    }
  }, [email, otp, router]);

  const onSubmit = async (data: PasswordFormData) => {
    setIsProcessing(true);
    try {
      await resetPassword({
        email: data.email,
        otp: data.otp,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      }).unwrap();

      setShowSuccessDialog(true);
      reset();
    } catch (error: any) {
      toast.error(error?.data?.message || t("errorMessage"));
      console.error("Reset password error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!email || !otp) {
    return null;
  }

  return (
    <>
      <div className="shadow rounded-lg bg-background1 p-10 w-full">
        <Title title={t("title")} subTitle={t("subTitle")} />

        <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-2">
          {newPasswordFormFields.map((pass) => (
            <InputField
              key={pass.id}
              label={pass.label}
              type={pass.type}
              placeholder={pass.placeholder}
              {...register(pass.name)}
              errors={errors[pass.name]?.message}
            />
          ))}

          <Button
            className="mt-3"
            type="submit"
            disabled={isSubmitted || isLoading}
          >
            {t("resetButton")}
          </Button>
        </form>
      </div>
    </>
  );
};

export default NewPasswordForm;
