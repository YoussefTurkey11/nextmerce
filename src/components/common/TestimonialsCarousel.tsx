"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

export function TestimonialsCarousel() {
  const t = useTranslations("Landpage");
  const locale = useLocale();
  const testimonialsCarouselItem = t.raw(
    "testimonials.testimonialsCarouselItem",
  ) as Array<{
    id: string;
    img: string;
    msg: string;
    name: string;
    position: string;
  }>;

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      dir="ltr"
      className="w-full relative"
    >
      <CarouselContent>
        {testimonialsCarouselItem.map((testi) => (
          <CarouselItem
            key={testi.id}
            className="basis-1/1 md:basis-1/2 lg:basis-1/3 my-10"
          >
            <div className="flex flex-col gap-2 border border-ring/30 rounded-lg p-5">
              <div className="flex items-center gap-2">
                <Star fill="#fbbf24" color="#fbbf24" size={15} />
                <Star fill="#fbbf24" color="#fbbf24" size={15} />
                <Star fill="#fbbf24" color="#fbbf24" size={15} />
                <Star fill="#fbbf24" color="#fbbf24" size={15} />
                <Star fill="#fbbf24" color="#fbbf24" size={15} />
              </div>

              <p className="py-3">{testi.msg}</p>

              <div className="flex items-center gap-2">
                <Image
                  src={testi.img}
                  width={50}
                  height={50}
                  alt={testi.name}
                  loading="lazy"
                  className="object-cover rounded-full"
                />
                <div>
                  <p className="font-semibold">{testi.name}</p>
                  <p className="text-xs">{testi.position}</p>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <h3
        className={`absolute -top-1/8 ${locale === "en" ? "left-0" : "right-0"} -translate-y-1/2 z-10 text-2xl md:text-3xl font-semibold`}
      >
        {t("testimonials.title")}
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
