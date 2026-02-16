"use client";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const FooterBannerSection = () => {
  const t = useTranslations("Footer");

  return (
    <section className="flex flex-col lg:flex-row items-center justify-between gap-5 rounded-lg p-10 m-10 bg-[url('/images/products/newsletter-bg.webp')] bg-cover bg-center">
      <div>
        <h4 className="text-xl md:text-4xl font-bold text-background xl:w-110">
          {t("footerBanner.title")}
        </h4>
        <p className="text-background">{t("footerBanner.subTitle")}</p>
      </div>
      <form className="flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-3 w-full">
        <input
          type="email"
          placeholder={t("footerBanner.placeholder")}
          className="py-3 px-5 rounded-full bg-background w-full xl:w-100"
          required
        />
        <Button variant={"secondary"} className="sm:w-fit">
          {t("footerBanner.btn")}
        </Button>
      </form>
    </section>
  );
};

export default FooterBannerSection;
