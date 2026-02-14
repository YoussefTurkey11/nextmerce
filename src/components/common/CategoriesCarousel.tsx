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

export function CategoriesCarousel() {
  const t = useTranslations("Landpage");
  const locale = useLocale();

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      dir="ltr"
      className="w-full relative"
    >
      <CarouselContent>
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2 md:basis-1/4 lg:basis-1/6"
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <h3
        className={`absolute -top-1/8 ${locale === "en" ? "left-0" : "right-0"} -translate-y-1/2 z-10 text-2xl md:text-3xl font-semibold`}
      >
        {t("categoryTitle")}
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
