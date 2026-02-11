"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { GoogleLogin } from "@react-oauth/google";
import { useSignUpWithGoogleMutation } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/store";
import { setToken, setUser } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SocialAuth = () => {
  const t = useTranslations("Auth.register");

  const [signUpWithGoogle] = useSignUpWithGoogleMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSuccess = async (credentialResponse: any) => {
    try {
      const idToken = credentialResponse.credential;

      const res = await signUpWithGoogle({
        idToken,
      }).unwrap();

      dispatch(setToken(res.token));
      dispatch(setUser(res.data));

      localStorage.setItem("token", res.token);

      toast.success("Welcome 🎉");

      router.push("/home");
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
