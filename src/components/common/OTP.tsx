"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

interface OTPProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  disabled?: boolean;
  className?: string;
  errorBorder?: string;
}

export function OTP({
  value,
  onChange,
  maxLength = 6,
  disabled = false,
  className = "",
  errorBorder,
}: OTPProps) {
  const handleComplete = (value: string) => {
    onChange(value);
  };

  return (
    <div className={className}>
      <InputOTP
        maxLength={maxLength}
        pattern={REGEXP_ONLY_DIGITS}
        value={value}
        onChange={onChange}
        onComplete={handleComplete}
        disabled={disabled}
      >
        <InputOTPGroup className="gap-2" dir="ltr">
          {Array.from({ length: maxLength }).map((_, index) => (
            <InputOTPSlot
              key={index}
              index={index}
              className={`w-10 h-10 sm:w-20 sm:h-15 border-0 shadow-none ring-[0.5px] ring-primary text-xl rounded-full ${errorBorder}`}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
