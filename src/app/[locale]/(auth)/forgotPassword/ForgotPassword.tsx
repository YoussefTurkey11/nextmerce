"use client";
import Title from "@/components/common/Title";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSendResetEmailMutation } from "@/redux/api/authApi";
import toast from "react-hot-toast";
import {
  ForgotPasswordFormDataSchema,
  forgotPasswordSchema,
} from "@/validations/forgotPassword/forgotPassword.schema";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ForgotPasswordFormData from "./ForgotPasswordData";
import Link from "next/link";

const ForgotPassword = () => {
  const t = useTranslations("Auth.forgotPassword");
  const locale = useLocale();
  const [forgotPassword, { isLoading }] = useSendResetEmailMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormDataSchema>({
    resolver: zodResolver(forgotPasswordSchema(t)),
    mode: "onChange",
  });

  const onSubmit = async (data: ForgotPasswordFormDataSchema) => {
    try {
      await forgotPassword({
        email: data.email,
      }).unwrap();
      toast.success(t("response.success"));
      router.push(
        `/${locale}/verifyOTP?email=${encodeURIComponent(data.email)}`,
      );
    } catch (error: any) {
      console.error(error);
      toast.error(t("response.error"));
    }
  };

  return (
    <div className="ring-[0.5px] ring-ring rounded-lg bg-background p-10">
      <Title title={t("title")} subTitle={t("subTitle")} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-5 mt-10 w-full md:w-100"
      >
        <ForgotPasswordFormData register={register} errors={errors} />
        <Button
          className="mt-3"
          type="submit"
          disabled={isSubmitting || isLoading}
        >
          {t("forgotPasswordBtn")}
        </Button>
        <div className="flex flex-col sm:flex-row items-center gap-1">
          <p className="text-ring text-sm">{t("haveAccount")}</p>
          <Link
            href={`/${locale}/login`}
            className="text-ring hover:text-primary underline transition-colors text-sm"
          >
            {t("forgotPasswordLink")}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
