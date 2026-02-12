"use client";
import { setToken, setUser } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/store";
import { removeAuthCookie } from "@/utils/cookie";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const locale = useLocale();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const logout = () => {
    removeAuthCookie();
    dispatch(setToken(""));
    dispatch(setUser(null));
    router.push(`/${locale}/login`);
  };
  return logout;
};
