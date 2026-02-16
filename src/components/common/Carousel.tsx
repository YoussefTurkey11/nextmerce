"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { Button } from "../ui/button";
import { useLocale, useTranslations } from "use-intl";

export default function CarouselComponent() {
  const locale = useLocale();
  const t = useTranslations("Landpage");
  const swiperItems = t.raw("carousel") as Array<{
    slogan: string;
    name: string;
    description: string;
    image: string;
  }>;
  return (
    <>
      <Swiper
        spaceBetween={10}
        pagination={{
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper cursor-grab rounded-xl"
      >
        {swiperItems.map((item, idx) => (
          <SwiperSlide
            key={idx}
            className="relative aspect-square lg:aspect-[1/1.2] xl:aspect-4/4 2xl:aspect-4/3"
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover rounded-xl"
            />

            <div className="absolute inset-0 bg-black/50 md:hidden"></div>
            <div
              className={`text-center ${locale === "en" ? "md:text-left" : "md:text-right"} w-full md:w-fit px-5 md:px-0 absolute top-1/2 left-1/2 md:left-10 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 space-y-5 text-background`}
            >
              <h3 className="uppercase font-semibold">{item.slogan}</h3>
              <h2 className="text-xl sm:text-5xl">{item.name}</h2>
              <p className="w-fit sm:w-100">{item.description}</p>
              <Button className="w-50 capitalize hover:bg-background hover:text-primary">
                {t("btns.shopNow")}
              </Button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
