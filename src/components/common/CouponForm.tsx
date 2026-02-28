"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { FieldErrors, useForm } from "react-hook-form";

type Props = {
  onApply: (code: string) => Promise<void>;
  loading?: boolean;
  disabled?: boolean;
  appliedCoupon?: string | null;
  errors: FieldErrors<any>;
};

type FormValues = {
  coupon: string;
};

export function CouponForm({
  onApply,
  loading,
  disabled,
  appliedCoupon,
  errors,
}: Props) {
  const { register, watch } = useForm<FormValues>();
  const t = useTranslations("Cart");

  const handleApply = async () => {
    const code = watch("coupon");

    if (!code) return;

    await onApply(code);
  };

  if (appliedCoupon) {
    return (
      <div className="border border-green-500 rounded-lg p-4 flex items-center justify-between bg-green-50">
        <div className="flex items-center gap-2 text-green-700 font-semibold">
          <Check size={18} />
          {appliedCoupon}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center flex-col md:flex-row gap-5">
      <div className="flex flex-col w-full">
        <Input
          {...register("coupon")}
          placeholder={t("coupon.placeholder")}
          type={"text"}
          className="py-5.5 px-5 rounded-full bg-background"
        />
        {errors && (
          <p className="text-destructive text-sm mt-1">
            {errors?.coupon?.message as string}
          </p>
        )}
      </div>

      <Button
        onClick={handleApply}
        disabled={loading || disabled}
        className="w-full md:w-fit"
        type="button"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>{t("coupon.applyBtn")}</>
        )}
      </Button>
    </div>
  );
}
