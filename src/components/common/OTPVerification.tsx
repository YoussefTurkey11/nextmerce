"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { OTPVerificationProps } from "@/types/OTPVerification";
import { useTranslations } from "next-intl";
import { OTP } from "./OTP";

export function OTPVerification({
  onVerify,
  isLoading = false,
  error: externalError,
  email,
}: OTPVerificationProps) {
  const [otp, setOTP] = useState("");
  const [isCodeComplete, setIsCodeComplete] = useState(false);
  const [internalError, setInternalError] = useState("");
  const [isErrorMode, setIsErrorMode] = useState(false);

  const t = useTranslations("Auth.verify");

  const error = externalError || internalError;

  // check from vaild code
  useEffect(() => {
    if (isCodeComplete && otp.length === 6) {
      handleSubmit();
    }
  }, [isCodeComplete, otp]);

  const handleSubmit = async () => {
    if (!otp.trim()) {
      setInternalError(t("pleaseEnterVerificationCode"));
      setIsErrorMode(true);
      return;
    }

    if (otp.length !== 6) {
      setInternalError(t("invalidCode"));
      setIsErrorMode(true);
      return;
    }

    try {
      await onVerify(email, otp);

      setInternalError("");
      setIsErrorMode(false);
    } catch (err: any) {
      setIsErrorMode(true);

      setTimeout(() => {
        setOTP("");
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
    setOTP(value);
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
          value={otp}
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
        {t("resendCode")}
      </Button>
    </div>
  );
}
