"use client";
import { useState, forwardRef, useEffect } from "react";
import parsePhoneNumber, { isValidPhoneNumber } from "libphonenumber-js";
import { CircleFlag } from "react-circle-flags";
import { lookup } from "country-data-list";
import { z } from "zod";
import { cn } from "@/lib/utils";

import { GlobeIcon } from "lucide-react";

export const phoneSchema = z.string().refine((value) => {
  try {
    return isValidPhoneNumber(value);
  } catch {
    return false;
  }
}, "Invalid phone number");

export type CountryData = {
  alpha2: string;
  alpha3: string;
  countryCallingCodes: string[];
  currencies: string[];
  emoji?: string;
  ioc: string;
  languages: string[];
  name: string;
  status: string;
};

interface PhoneInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  onCountryChange?: (data: CountryData | undefined) => void;
  value?: string;
  onChange?:
    | ((value: string) => void)
    | ((e: React.ChangeEvent<HTMLInputElement>) => void);
  placeholder?: string;
  defaultCountry?: string;
  className?: string;
  inline?: boolean;
  error?: string;
  isSubmitting?: boolean;
  label?: string;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      className,
      onCountryChange,
      onChange,
      value = "",
      placeholder,
      defaultCountry,
      inline = false,
      error,
      isSubmitting,
      label,
      ...props
    },
    ref,
  ) => {
    const [countryData, setCountryData] = useState<CountryData | undefined>();
    const [displayFlag, setDisplayFlag] = useState<string>("");
    const [hasInitialized, setHasInitialized] = useState(false);

    useEffect(() => {
      if (defaultCountry) {
        const newCountryData = lookup.countries({
          alpha2: defaultCountry.toLowerCase(),
        })[0];
        setCountryData(newCountryData);
        setDisplayFlag(defaultCountry.toLowerCase());

        if (
          !hasInitialized &&
          newCountryData?.countryCallingCodes?.[0] &&
          !value
        ) {
          // تحديث لاستدعاء onChange مع string
          if (onChange) {
            (onChange as (value: string) => void)(
              newCountryData.countryCallingCodes[0],
            );
          }
          setHasInitialized(true);
        }
      }
    }, [defaultCountry, onChange, value, hasInitialized]);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;

      if (!newValue.startsWith("+")) {
        if (newValue.startsWith("00")) {
          newValue = "+" + newValue.slice(2);
        } else {
          newValue = "+" + newValue;
        }
      }

      try {
        const parsed = parsePhoneNumber(newValue);

        if (parsed && parsed.country) {
          const countryCode = parsed.country;
          setDisplayFlag(countryCode.toLowerCase());

          const countryInfo = lookup.countries({ alpha2: countryCode })[0];
          setCountryData(countryInfo);
          onCountryChange?.(countryInfo);

          if (onChange) {
            (onChange as (value: string) => void)(parsed.number);
          }
        } else {
          if (onChange) {
            (onChange as (value: string) => void)(newValue);
          }
          setDisplayFlag("");
          setCountryData(undefined);
          onCountryChange?.(undefined);
        }
      } catch (error) {
        console.error("Error parsing phone number:", error);
        if (onChange) {
          (onChange as (value: string) => void)(newValue);
        }
        setDisplayFlag("");
        setCountryData(undefined);
        onCountryChange?.(undefined);
      }
    };

    const containerClasses = cn("flex flex-col gap-1 w-full", className);

    const inputContainerClasses = cn(
      "flex items-center gap-2 relative bg-background2 transition-colors text-base rounded-full border ring-[0.5px] px-7 py-3",
      "has-[input:focus]:outline-none has-[input:focus]:ring-1 has-[input:focus]:ring-ring",
      error ? "border-error" : "border-primaryContainer2",
      inline && "rounded-l-none",
      isSubmitting && "opacity-50 cursor-not-allowed",
    );

    return (
      <div className={containerClasses}>
        <div className={inputContainerClasses}>
          <div className="w-5 h-5 rounded-full shrink-0">
            {displayFlag ? (
              <CircleFlag countryCode={displayFlag} height={20} />
            ) : (
              <GlobeIcon size={20} className="text-onSurface3" />
            )}
          </div>
          <input
            ref={ref}
            value={value}
            onChange={handlePhoneChange}
            placeholder={placeholder || "Enter phone number"}
            type="tel"
            autoComplete="tel"
            name="phone"
            disabled={isSubmitting}
            className="flex w-full border-none bg-transparent text-base transition-colors placeholder:text-muted-foreground outline-none h-auto py-0 p-0 leading-none md:text-sm disabled:cursor-not-allowed"
            {...props}
          />
        </div>
        {error && <p className="text-error text-sm mt-1 px-2">{error}</p>}
      </div>
    );
  },
);

PhoneInput.displayName = "PhoneInput";
