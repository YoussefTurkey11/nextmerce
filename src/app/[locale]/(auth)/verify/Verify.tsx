"use client";
import Title from "@/components/common/Title";
import { useLocale, useTranslations } from "next-intl";
import {
  useResendVerifyCodeMutation,
  useVerifyEmailMutation,
} from "@/redux/api/authApi";
import { RootState, useAppSelector } from "@/redux/store";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { OTPVerification } from "@/components/common/OTPVerification";

const VerifyPage = () => {
  const t = useTranslations("Auth.verify");
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const token = useAppSelector((state: RootState) => state.auth.token);
  const [verifyEmail] = useVerifyEmailMutation();
  const [resendVerifyCode, { isLoading: isResending }] =
    useResendVerifyCodeMutation();

  const handleVerify = async (otp: string): Promise<boolean> => {
    if (!token) {
      toast.error(t("authRequired"));
      router.push(`/${locale}/login`);
      false;
    }

    try {
      await verifyEmail({
        email,
        OTP: otp,
      }).unwrap();

      toast.success(t("response.success"));
      return true;
    } catch (error: any) {
      console.error(error);
      toast.error(t("response.error"));
      return false;
    }
  };

  const handleResend = async () => {
    if (!token) {
      toast.error(t("authRequired"));
      router.push(`/${locale}/login`);
      return false;
    }

    try {
      await resendVerifyCode().unwrap();
      toast.success(t("resendSuccess"));
      return;
    } catch (error: any) {
      console.error(error);
      toast.error(t("response.error"));
    }
  };

  return (
    <div className="shadow rounded-lg bg-background1 p-10">
      <Title title={t("title")} subTitle={t("subTitle")} />
      <OTPVerification
        type={"email-verification"}
        email={email}
        onVerify={handleVerify}
        isResending={isResending}
        successTitle={t("successTitle")}
        successDescription={t("successDescription")}
      />
    </div>
  );
};

export default VerifyPage;
