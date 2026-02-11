"use client";
import Divider from "@/components/common/Divider";
import SocialAuth from "@/components/common/SocialAuth";
import Title from "@/components/common/Title";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/redux/api/authApi";
import { setAuthCookie } from "@/utils/cookie";
import { useAppDispatch } from "@/redux/store";
import { setToken, setUser } from "@/redux/slices/authSlice";
import toast from "react-hot-toast";
import {
  RegisterFormDataSchema,
  registerSchema,
} from "@/validations/register/register.schema";
import { useRouter } from "next/navigation";
import RegisterFormData from "./RegisterFormData";

const RegisterPage = () => {
  const t = useTranslations("Auth.register");
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const router = useRouter();

  const {
    register: registerForm,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    control,
    setValue,
  } = useForm<RegisterFormDataSchema>({
    resolver: zodResolver(registerSchema(t)),
    mode: "onChange",
    defaultValues: {
      phone: "",
    },
  });

  const phoneValue = watch("phone");

  const onSubmit = async (data: RegisterFormDataSchema) => {
    try {
      const res = await register({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      }).unwrap();

      console.log(res);

      const token = res.token;

      setAuthCookie(token);
      dispatch(setToken(token));
      dispatch(setUser(res.data));

      toast.success(t("response.success"));
      router.push(`/${locale}/login`);
    } catch (error: any) {
      if (error.data?.message === "🛑 Email already in use") {
        toast.error(t("validation.existEmail") || error?.data?.message);
      } else {
        toast.error(error?.data?.message || t("response.error"));
      }
      console.error(error?.data?.message);
    }
  };

  return (
    <div className="shadow rounded-lg bg-background1 p-10">
      <Title title={t("title")} subTitle={t("subTitle")} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-5 mt-10 w-full md:w-100"
      >
        <SocialAuth />
        <Divider />
        <RegisterFormData
          register={registerForm}
          errors={errors}
          control={control}
          phoneValue={phoneValue}
          isSubmitting={isSubmitting}
          setValue={setValue}
        />
        <Button
          className="mt-3"
          type="submit"
          disabled={isSubmitting || isLoading}
        >
          {t("registerBtn")}
        </Button>
        <div className="flex flex-col sm:flex-row items-center gap-1">
          <p className="text-onSurface1 text-sm">{t("haveAccount")}</p>
          <Link
            href={`/${locale}/login`}
            className="text-onSurface3 hover:text-primary1 transition-colors text-sm"
          >
            {t("registerLink")}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
