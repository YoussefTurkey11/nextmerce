"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/store";
import {
  setToken,
  setUser,
  clearAuth,
  setAuthInitialized,
} from "@/redux/slices/authSlice";
import { useLazyGetUserQuery } from "@/redux/api/authApi";
import { getAuthCookie } from "@/utils/cookie";

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const [getUser] = useLazyGetUserQuery();

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
      } catch {
        dispatch(clearAuth());
      } finally {
        dispatch(setAuthInitialized(true));
      }
    };

    initAuth();
  }, []);

  return <>{children}</>;
};

export default AuthInitializer;
