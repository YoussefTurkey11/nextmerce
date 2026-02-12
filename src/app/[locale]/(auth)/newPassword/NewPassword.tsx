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
import { Lock } from "lucide-react";

const NewPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const resetCode = searchParams.get("resetCode") || "";
  const t = useTranslations("Auth.newPassword");
  const locale = useLocale();

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const newPasswordFormFields = t.raw("formFields") as Array<{
    id: string;
    name: keyof PasswordFormData;
    label: string;
    type: Exclude<TInputType, "phone">;
    placeholder: string;
    description?: string;
    required: boolean;
  }>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema(t)),
    defaultValues: {
      email,
      newPassword: "",
      confirmNewPassword: "",
    },
    mode: "onChange",
  });

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  // Validate URL parameters
  useEffect(() => {
    if (!email || !resetCode) {
      toast.error(t("invalidLink"));
      router.push(`/${locale}/forgotPassword`);
    }
  }, [email, resetCode, router, locale, t]);

  const onSubmit = async (data: PasswordFormData) => {
    console.log("Form submitted with data:", data);
    console.log("Reset code:", resetCode);

    setIsProcessing(true);
    try {
      const response = await resetPassword({
        email: data.email,
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword,
        resetCode: resetCode,
      }).unwrap();

      console.log("Reset password response:", response);

      setShowSuccessDialog(true);
      reset();

      setTimeout(() => {
        router.push(`/${locale}/login`);
      }, 2000);
    } catch (error: any) {
      console.error("Reset password error details:", error);
      toast.error(error?.data?.message || error?.message || t("errorMessage"));
    } finally {
      setIsProcessing(false);
    }
  };

  if (!email || !resetCode) {
    return null;
  }

  return (
    <>
      <div className="ring-[0.5px] ring-ring rounded-lg bg-background p-10">
        <Title title={t("title")} subTitle={t("subTitle")} />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center gap-5 mt-10 w-full md:w-100"
        >
          {newPasswordFormFields.map((pass) => (
            <InputField
              key={pass.id}
              label={pass.label}
              type={pass.type}
              placeholder={pass.placeholder}
              name={pass.name}
              register={register(pass.name)}
              errors={errors}
              control={control as any}
              icon={<Lock />}
            />
          ))}

          <Button
            className="mt-3"
            type="submit"
            disabled={isSubmitting || isLoading || isProcessing}
          >
            {isSubmitting || isLoading || isProcessing
              ? t("resetting")
              : t("resetButton")}
          </Button>
        </form>
      </div>
    </>
  );
};

export default NewPasswordForm;
