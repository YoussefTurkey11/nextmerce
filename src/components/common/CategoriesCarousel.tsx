"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { TCategory } from "@/types/category";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

export function CategoriesCarousel() {
  const t = useTranslations("Landpage");
  const locale = useLocale();
  const { data, isLoading } = useGetAllCategoriesQuery({ page: 1, limit: 10 });

  const category = data?.data?.data ?? [];

  if (isLoading)
    return (
      <div className="flex gap-6">
        {Array.from({ length: 10 }).map((_, idx) => (
          <div key={idx} className="flex flex-col items-center gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      dir="ltr"
      className="w-full relative border-b border-ring/30"
    >
      <CarouselContent>
        {category.map((cate: TCategory) => (
          <CarouselItem
            key={cate.id}
            className="basis-1/2 md:basis-1/4 lg:basis-1/6 my-10"
          >
            <Link href={cate.id} className="group flex flex-col items-center">
              <div className="rounded-full bg-primary/5 p-5 w-30 h-30 flex items-center justify-center group-hover:scale-[1.1] transition-all">
                {cate.image ? (
                  <Image
                    src={cate.image}
                    width={100}
                    height={100}
                    alt={cate.name}
                    loading="lazy"
                    className="object-contain"
                  />
                ) : (
                  <div>{locale === "en" ? "No Image" : "بلا صورة"}</div>
                )}
              </div>

              <p className="group-hover:text-primary transition-colors font-semibold py-3">
                {cate.name}
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
