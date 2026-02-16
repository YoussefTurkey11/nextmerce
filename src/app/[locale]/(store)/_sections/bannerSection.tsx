"use client";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

const BannerSection = () => {
  const locale = useLocale();
  const t = useTranslations("Landpage");
  const bannerData = t.raw("bannerData") as Array<{
    id: string;
    subTitle: string;
    title: string;
    desc: string;
    btn: string;
    img: string;
    alt: string;
    bgColor: string;
    actionColor: string;
    style?: string;
    styleImg: string;
  }>;

  return (
    <section className="my-30 px-10">
      <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-2 md:grid-rows-2 gap-5">
        {bannerData.length > 0 &&
          bannerData.map((banner) => (
            <div
              key={banner.id}
              style={{ backgroundColor: banner.bgColor }}
              className={`${banner.style ? banner.style : ""} rounded-lg overflow-hidden`}
            >
              <div className="flex flex-col md:flex-row items-center justify-between p-10">
                <div
                  className={`p-6 md:p-12 space-y-5 text-center ${
                    locale === "en" ? "md:text-left" : "md:text-right"
                  }`}
                >
                  <h3 className="uppercase font-semibold text-xl">
                    {banner.subTitle}
                  </h3>

                  <h2 className="text-2xl sm:text-4xl font-bold">
                    {banner.title}
                  </h2>

                  <p className="max-w-md text-sm sm:text-base text-muted-foreground">
                    {banner.desc}
                  </p>

                  <Button
                    style={{ backgroundColor: banner.actionColor }}
                    className="w-40 capitalize"
                  >
                    {banner.btn}
                  </Button>
                </div>

                <div className={banner.styleImg}>
                  <Image
                    src={banner.img}
                    alt={banner.alt}
                    fill
                    className="object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default BannerSection;
