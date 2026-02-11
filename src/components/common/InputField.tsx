"use client";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { TInputFieldProps } from "@/types/loginTypes";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PhoneInput } from "../ui/phone-input";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

export function InputField(props: TInputFieldProps) {
  const t = useTranslations("Auth.login");
  const locale = useLocale();
  const pathname = usePathname();
  const [showPassword, setShowPassword] = useState(false);

  const isPhoneInput = props.type === "phone";
  const isPasswordWithLogin =
    pathname.endsWith("login") && props.type === "password";
  const inputType =
    props.type === "password"
      ? showPassword
        ? "text"
        : "password"
      : props.type;

  if (isPhoneInput) {
    const errorMessage = props.errors?.[props.name || "phone"]?.message as
      | string
      | undefined;

    return (
      <Field>
        <FieldLabel htmlFor={props.label} className="capitalize text-md">
          {props.label}
        </FieldLabel>
        <PhoneInput
          value={props.phoneValue}
          onChange={props.onPhoneChange}
          error={errorMessage}
          placeholder={props.placeholder || "012 7****"}
          defaultCountry=""
          isSubmitting={props.isSubmitting}
        />
      </Field>
    );
  }

  return (
    <Field>
      {isPasswordWithLogin ? (
        <div className="flex items-center justify-between">
          <FieldLabel htmlFor={props.label} className="capitalize text-md">
            {props.label}
          </FieldLabel>
          <Link
            href={`/${locale}/forgotPassword`}
            className="hidden sm:flex text-onSurface3 hover:text-primary1 transition-colors text-sm"
          >
            {t("forgotPassword")}
          </Link>
        </div>
      ) : (
        <FieldLabel htmlFor={props.label} className="capitalize text-md">
          {props.label}
        </FieldLabel>
      )}

      <div className="flex flex-col gap-3">
        <InputGroup
          className={`relative py-6 px-5 rounded-full bg-background2 ring-[0.5px] ${
            props.errors?.[props.name]
              ? "border-error"
              : "border-primaryContainer2"
          }`}
        >
          <InputGroupInput
            id={props.label}
            placeholder={props.placeholder}
            type={inputType}
            {...props.register}
            disabled={props.isSubmitting}
          />
          <InputGroupAddon className="text-onSurface3">
            {props.icon}
          </InputGroupAddon>
          {props.type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 end-5 top-1/2 -translate-y-1/2 cursor-pointer px-1 text-onSurface3 hover:text-primary3 transition-colors"
            >
              {showPassword ? <EyeClosed size={22.5} /> : <Eye size={22.5} />}
            </button>
          )}
        </InputGroup>

        {props.errors?.[props.name] && (
          <p className="text-error text-sm mt-1">
            {props.errors[props.name]?.message as string}
          </p>
        )}

        {isPasswordWithLogin && (
          <Link
            href={`/${locale}/forgotPassword`}
            className="flex sm:hidden text-onSurface3 hover:text-primary1 transition-colors text-sm"
          >
            {t("forgotPassword")}
          </Link>
        )}
      </div>
    </Field>
  );
}
