import { TAddress } from "./address";

export interface User {
  id: number;
  type: "client";
  name: string;
  email: string;
  phone: string;
  profileImage: string;
  addresses: TAddress[];
  role: string;
  email_verified_at: boolean;
  count_items_cart: number;
  referral_code: string;
  total_points: number;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  phone?: string;
  type?: "client";
}

export interface AuthResponse {
  status: boolean;
  status_code: number;
  data: User;
  message: string;
  token: string;
}

export type TInputType =
  | "text"
  | "password"
  | "phone"
  | "file"
  | "url"
  | "email";

export type ResetPasswordStep = "email" | "otp" | "new-password";
