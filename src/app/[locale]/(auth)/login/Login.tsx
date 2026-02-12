"use client";
import Divider from "@/components/common/Divider";
import SocialAuth from "@/components/common/SocialAuth";
import Title from "@/components/common/Title";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LoginFormData from "./LoginFormData";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoginFormDataSchema,
  loginSchema,
} from "@/validations/login/login.schema";
import { useLoginMutation } from "@/redux/api/authApi";
import { setAuthCookie } from "@/utils/cookie";
import { useAppDispatch } from "@/redux/store";
import { setToken, setUser } from "@/redux/slices/authSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const t = useTranslations("Auth.login");
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormDataSchema>({
    resolver: zodResolver(loginSchema(t)),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormDataSchema) => {
    try {
      const res = await login({
        email: data.email,
        password: data.password,
      }).unwrap();

      if (res.message && res.message.includes("email is not verified")) {
        router.push(`/${locale}/verify?email=${data.email}`);
        return;
      }

      const token = res.token;

      setAuthCookie(token);
      dispatch(setToken(token));
      dispatch(setUser(res.data));

      toast.success(t("response.success"));
      router.push(`/${locale}/`);
    } catch (error: any) {
      console.error(error);
      toast.error(t("response.error"));
    }
  };

  return (
    <div className="ring-[0.5px] ring-ring rounded-lg bg-background p-10">
      <Title title={t("title")} subTitle={t("subTitle")} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-5 mt-10 w-full md:w-100"
      >
        <SocialAuth />
        <Divider />
        <LoginFormData register={register} errors={errors} />
        <Button
          className="mt-3"
          type="submit"
          disabled={isSubmitting || isLoading}
        >
          {t("loginBtn")}
        </Button>
        <div className="flex flex-col sm:flex-row items-center gap-1">
          <p className="text-ring text-sm">{t("haveAccount")}</p>
          <Link
            href={`/${locale}/register`}
            className="text-ring hover:text-primary underline transition-colors text-sm"
          >
            {t("registerLink")}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
