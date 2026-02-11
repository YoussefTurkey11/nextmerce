import { Control, FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import { TInputType } from "./authTypes";

export type TLoginImgs = {
  id: string;
  alt: string;
  src: string;
};

export type TBaseFieldProps = {
  label: string;
  placeholder: string;
  errors: FieldErrors<any>;
  isSubmitting?: boolean;
  disabled?: boolean;
  required?: boolean;
};

export interface TNormalInputProps extends TBaseFieldProps {
  type: Exclude<TInputType, "phone">;
  name: string;
  register: UseFormRegisterReturn;
  control: Control<any>;
  icon?: React.ReactNode;
}

export interface TPhoneInputProps extends TBaseFieldProps {
  type: "phone";
  phoneValue: string;
  onPhoneChange: (value: string) => void;
  name?: string;
}

export type TInputFieldProps = TNormalInputProps | TPhoneInputProps;
