"use client";
import CountDown from "@/components/common/CountDown";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

const CountDownSection = () => {
  const t = useTranslations("Landpage");
  const locale = useLocale();
  return (
    <section className="my-30 px-10">
      <div
        className={`flex ${locale === "en" ? "lg:flex-row" : "lg:flex-row-reverse"} flex-col items-center justify-between bg-[#d0e9f3] rounded-lg`}
      >
        <div
          className={`p-6 md:p-12 space-y-5 text-center w-full lg:w-[50%] ${
            locale === "en" ? "lg:text-left" : "lg:text-right"
          }`}
        >
          <h4 className="uppercase font-semibold text-xl text-primary">
            {t("contDownData.subTitle")}
          </h4>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl w-full font-bold">
            {t("contDownData.title")}
          </h2>

          <p className="max-w-md text-sm sm:text-base text-muted-foreground">
            {t("contDownData.desc")}
          </p>

          <CountDown />

          <Button className="w-40 capitalize">{t("contDownData.btn")}</Button>
        </div>

        <div className="hidden lg:flex lg:bg-[url('/images/products/countdown-bg.webp')] lg:bg-bottom p-10 w-full lg:w-[50%]">
          <Image
            src={t("contDownData.img")}
            width={500}
            height={500}
            alt={t("contDownData.alt")}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default CountDownSection;
