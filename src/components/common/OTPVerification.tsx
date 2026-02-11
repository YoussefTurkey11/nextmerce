"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { OTPVerificationProps } from "@/types/OTPVerification";
import { useLocale, useTranslations } from "next-intl";
import { OTP } from "./OTP";
import { useRouter } from "next/navigation";

export function OTPVerification({
  onVerify,
  isLoading = false,
  error: externalError,
  email,
}: OTPVerificationProps) {
  const [resetCode, setResetCode] = useState("");
  const [isCodeComplete, setIsCodeComplete] = useState(false);
  const [internalError, setInternalError] = useState("");
  const [isErrorMode, setIsErrorMode] = useState(false);

  const t = useTranslations("Auth.verify");
  const locale = useLocale();
  const router = useRouter();
  const error = externalError || internalError;

  // check from vaild code
  useEffect(() => {
    if (isCodeComplete && resetCode.length === 6) {
      handleSubmit();
    }
  }, [isCodeComplete, resetCode]);

  const handleSubmit = async () => {
    if (!resetCode.trim()) {
      setInternalError(t("pleaseEnterVerificationCode"));
      setIsErrorMode(true);
      return;
    }

    if (resetCode.length !== 6) {
      setInternalError(t("invalidCode"));
      setIsErrorMode(true);
      return;
    }

    try {
      const success = await onVerify(resetCode);

      if (success) {
        router.push(
          `/${locale}/newPassword?email=${encodeURIComponent(email)}&resetCode=${resetCode}`,
        );
      }

      setInternalError("");
      setIsErrorMode(false);
    } catch (err: any) {
      setIsErrorMode(true);

      setTimeout(() => {
        setResetCode("");
        setIsCodeComplete(false);
        setTimeout(() => {
          setIsErrorMode(false);
        }, 2000);
      }, 300);
    } finally {
      setIsCodeComplete(false);
    }
  };

  const handleOTPChange = (value: string) => {
    setResetCode(value);
    setIsCodeComplete(value.length === 6);

    if (internalError) {
      setInternalError("");
      setIsErrorMode(false);
    }
  };

  return (
    <div>
      <div
        className={`my-5 transition-all duration-300 ${isErrorMode ? "shake-animation" : ""}`}
      >
        <OTP
          value={resetCode}
          onChange={handleOTPChange}
          maxLength={6}
          disabled={isLoading}
          className={`flex justify-center transition-all duration-200`}
          errorBorder={`${isErrorMode ? "opacity-70 shake-animation ring-[0.5px] ring-red-500 text-red-500" : ""}`}
        />
        {error && (
          <div className="mt-2 text-sm text-red-500 animate-fade-in">
            {error}
          </div>
        )}
      </div>

      <Button onClick={handleSubmit} type="submit">
        {t("verifyLink")}
      </Button>
    </div>
  );
}
