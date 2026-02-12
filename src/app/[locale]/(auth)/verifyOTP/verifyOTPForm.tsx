"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCheckResetOtpMutation } from "@/redux/api/authApi";
import { OTPVerification } from "@/components/common/OTPVerification";
import toast from "react-hot-toast";
import { useLocale, useTranslations } from "next-intl";
import Title from "@/components/common/Title";

const VerifyOTPForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [resetCode, setResetCode] = useState("");
  const t = useTranslations("Auth.verifyOTP");
  const locale = useLocale();

  const [checkResetOtp, { isLoading: isVerifying }] =
    useCheckResetOtpMutation();

  // Redirect if no email
  useEffect(() => {
    if (!email) {
      toast.error(t("emailRequired"));
      router.push(`/${locale}/forgotPassword`);
    }
  }, [email, router]);

  const handleVerify = async (resetCode: string): Promise<boolean> => {
    if (!email) {
      toast.error(t("emailRequired"));
      router.push(`/${locale}/forgotPassword`);
      return false;
    }

    try {
      await checkResetOtp({ resetCode }).unwrap();
      return true;
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || t("response.error"));
      return false;
    }
  };

  if (!email) {
    return null;
  }

  return (
    <div className="ring-[0.5px] ring-ring rounded-lg bg-background p-10">
      <Title title={t("title")} subTitle={t("subTitle")} />

      <OTPVerification
        type="password-reset"
        email={email}
        onVerify={handleVerify}
        isLoading={isVerifying}
        successTitle={t("successTitle")}
        successDescription={t("successDescription")}
        backButtonText={t("backButtonText")}
      />
    </div>
  );
};

export default VerifyOTPForm;
