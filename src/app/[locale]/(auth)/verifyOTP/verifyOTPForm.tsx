"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useCheckResetOtpMutation,
  useSendResetEmailMutation,
} from "@/redux/api/authApi";
import { OTPVerification } from "@/components/common/OTPVerification";
import toast from "react-hot-toast";
import { useLocale, useTranslations } from "next-intl";
import Title from "@/components/common/Title";

const VerifyOTPForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [otpCode, setOtpCode] = useState("");
  const t = useTranslations("Auth.verifyOTP");
  const locale = useLocale();

  const [checkResetOtp, { isLoading: isVerifying }] =
    useCheckResetOtpMutation();
  const [sendResetEmail, { isLoading: isResending }] =
    useSendResetEmailMutation();

  // Redirect if no email
  useEffect(() => {
    if (!email) {
      toast.error(t("emailRequired"));
      router.push(`/${locale}/forgetPassword`);
    }
  }, [email, router]);

  const handleVerify = async (otp: string) => {
    if (!email) {
      toast.error(t("emailRequired"));
      router.push(`/${locale}/forgetPassword`);
      return;
    }

    try {
      const response = await checkResetOtp({ email, otp }).unwrap();
      setOtpCode(otp);
      return response;
    } catch (error: any) {
      console.error(error);
      toast.error(t("response.error"));
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error(t("emailRequired"));
      router.push(`/${locale}/forgetPassword`);
      return;
    }

    try {
      await sendResetEmail({ email }).unwrap();
      toast.success(t("resetCodeResent"));
      return;
    } catch (error: any) {
      console.error(error);
      toast.error(t("response.error"));
    }
  };

  const handleSuccessAction = () => {
    router.push(
      `/${locale}/newPassword?email=${encodeURIComponent(email)}&otp=${otpCode}`,
    );
  };

  const handleBack = () => {
    router.push(`/${locale}/forgetPassword`);
  };

  if (!email) {
    return null;
  }

  return (
    <div className="shadow rounded-lg bg-background1 p-10">
      <Title title={t("title")} subTitle={t("subTitle")} />

      <OTPVerification
        type="password-reset"
        email={email}
        onVerify={handleVerify}
        onResend={handleResend}
        isLoading={isVerifying}
        isResending={isResending}
        successTitle={t("successTitle")}
        successDescription={t("successDescription")}
        onSuccessAction={handleSuccessAction}
        backButtonText={t("backButtonText")}
        onBack={handleBack}
      />
    </div>
  );
};

export default VerifyOTPForm;
