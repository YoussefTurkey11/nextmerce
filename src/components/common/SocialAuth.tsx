"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

const SocialAuth = () => {
  const t = useTranslations("Auth.register");

  return (
    <div className="flex flex-col gap-1 w-full">
      <Button
        className="group mt-3 bg-background2 hover:bg-divider border border-primaryContainer2 text-primary3 flex items-center gap-3"
        type="button"
      >
        <Image
          src="/images/auth/google.svg"
          width={20}
          height={20}
          alt="google-login"
          loading="lazy"
        />
        <span>{t("google")}</span>
      </Button>

      <Button
        className="group mt-3 bg-background2 hover:bg-divider border border-primaryContainer2 text-primary3 flex items-center gap-3"
        type="button"
      >
        <Image
          src="/images/auth/facebook.svg"
          width={20}
          height={20}
          alt="facebook-login"
          loading="lazy"
        />
        <span>{t("facebook")}</span>
      </Button>
    </div>
  );
};

export default SocialAuth;
