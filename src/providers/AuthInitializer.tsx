"use client";

import { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import {
  setToken,
  setUser,
  clearAuth,
  setAuthInitialized,
} from "@/redux/slices/authSlice";
import { useLazyGetUserQuery } from "@/redux/api/authApi";
import { getAuthCookie } from "@/utils/cookie";
import { openAuthDialog } from "@/redux/slices/uiSlice";
import { usePathname } from "next/navigation";
import { useLazyGetAllProductsInCartQuery } from "@/redux/api/cartApi";

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { user, authInitialized } = useAppSelector(
    (state: RootState) => state.auth,
  );
  const [getUser] = useLazyGetUserQuery();
  const [getCart] = useLazyGetAllProductsInCartQuery();
  const pathname = usePathname();

  useEffect(() => {
    const initAuth = async () => {
      const token = getAuthCookie();

      if (!token) {
        dispatch(setAuthInitialized(true));
        return;
      }

      dispatch(setToken(token));

      try {
        const res = await getUser().unwrap();
        dispatch(setUser(res.data));
        await getCart().unwrap();
      } catch {
        dispatch(clearAuth());
      } finally {
        dispatch(setAuthInitialized(true));
      }
    };

    initAuth();
  }, []);

  useEffect(() => {
    if (
      authInitialized &&
      !user &&
      ![
        `/en/login`,
        `/en/register`,
        `/en/forgotPassword`,
        `/en/verify`,
        `/en/verifyOTP`,
        `/en/newPassword`,
        `/ar/login`,
        `/ar/register`,
        `/ar/forgotPassword`,
        `/ar/verify`,
        `/ar/verifyOTP`,
        `/ar/newPassword`,
      ].includes(pathname)
    ) {
      setTimeout(() => dispatch(openAuthDialog()), 3000);
    }
  }, [authInitialized, user, dispatch]);

  return <>{children}</>;
};

export default AuthInitializer;
