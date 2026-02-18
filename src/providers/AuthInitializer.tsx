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
import { useLazyGetAllWishlistsQuery } from "@/redux/api/wishlistApi";

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { user, authInitialized } = useAppSelector(
    (state: RootState) => state.auth,
  );
  const [getUser] = useLazyGetUserQuery();
  const [getCart] = useLazyGetAllProductsInCartQuery();
  const [getWishlist] = useLazyGetAllWishlistsQuery();
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
        const userRes = await getUser().unwrap();
        dispatch(setUser(userRes.data));
      } catch (error) {
        dispatch(clearAuth());
        dispatch(setAuthInitialized(true));
        return;
      }

      try {
        await Promise.all([getCart().unwrap(), getWishlist().unwrap()]);
      } catch (err) {
        console.log("Cart or wishlist failed, but user still logged in");
      }

      dispatch(setAuthInitialized(true));
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
  }, [authInitialized, user, pathname, dispatch]);

  return <>{children}</>;
};

export default AuthInitializer;
