"use client";
import { useLocale, useTranslations } from "next-intl";
import { GoogleLogin } from "@react-oauth/google";
import { useSignUpWithGoogleMutation } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/store";
import { setToken, setUser } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { setAuthCookie } from "@/utils/cookie";

const SocialAuth = () => {
  const t = useTranslations("Auth.register");
  const locale = useLocale();
  const [signUpWithGoogle] = useSignUpWithGoogleMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSuccess = async (credentialResponse: any) => {
    try {
      const idToken = credentialResponse.credential;

      const res = await signUpWithGoogle({
        idToken,
      }).unwrap();

      const token = res.data.token;
      console.log(res);

      setAuthCookie(token);
      dispatch(setToken(token));
      dispatch(setUser(res.data));

      toast.success(t("response.success"));

      router.push(`/${locale}/`);
    } catch (error: any) {
      console.error(error);
      toast.error(error?.data?.message || "Google login failed");
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => toast.error("Google Login Failed")}
      theme="outline"
      size="large"
      shape="pill"
      text="continue_with"
      width="250"
    />
  );
};

export default SocialAuth;
