"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const categoriesCarouselItem = [
  {
    id: "pc&Laptop",
    img: "/images/products/pc.webp",
    title: "Laptop & PC",
    link: "/",
  },
  {
    id: "watches",
    img: "/images/products/watch.webp",
    title: "Watches",
    link: "/",
  },
  {
    id: "mobiles&tablets",
    img: "/images/products/iphone.webp",
    title: "Mobile & Tablets",
    link: "/",
  },
  {
    id: "health&sports",
    img: "/images/products/health.webp",
    title: "Health & Sports",
    link: "/",
  },
  {
    id: "homeApps",
    img: "/images/products/hone.webp",
    title: "Home Applications",
    link: "/",
  },
  {
    id: "games",
    img: "/images/products/game.webp",
    title: "Games & Videos",
    link: "/",
  },
  {
    id: "tvs",
    img: "/images/products/tv.webp",
    title: "Televisions",
    link: "/",
  },
];

export function CategoriesCarousel() {
  const t = useTranslations("Landpage");
  const locale = useLocale();
  const categoriesCarouselItem = t.raw(
    "categories.categoriesCarouselItem",
  ) as Array<{
    id: string;
    img: string;
    title: string;
    link: string;
  }>;

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      dir="ltr"
      className="w-full relative border-b border-ring/30"
    >
      <CarouselContent>
        {categoriesCarouselItem.map((cate) => (
          <CarouselItem
            key={cate.id}
            className="basis-1/2 md:basis-1/4 lg:basis-1/6 my-10"
          >
            <Link href={cate.link} className="group flex flex-col items-center">
              <div className="rounded-full bg-primary/5 p-5 w-30 h-30 flex items-center justify-center group-hover:scale-[1.1] transition-all">
                <Image
                  src={cate.img}
                  width={100}
                  height={100}
                  alt={cate.title}
                  loading="lazy"
                  className="object-contain"
                />
              </div>

              <p className="group-hover:text-primary transition-colors font-semibold py-3">
                {cate.title}
              </p>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>

      <h3
        className={`absolute -top-1/8 ${locale === "en" ? "left-0" : "right-0"} -translate-y-1/2 z-10 text-2xl md:text-3xl font-semibold`}
      >
        {t("categories.categoryTitle")}
      </h3>

      <div
        className={`absolute -top-1/8 ${locale === "en" ? "right-12" : "left-12"} -translate-y-1/2 z-10 flex gap-2`}
      >
        <CarouselPrevious className="p-5!" />
        <CarouselNext className="p-5!" />
      </div>
    </Carousel>
  );
}
