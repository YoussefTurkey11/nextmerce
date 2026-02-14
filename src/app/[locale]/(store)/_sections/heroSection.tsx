"use client";
import CarouselComponent from "@/components/common/Carousel";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  const t = useTranslations("Landpage");
  const carouselData = t.raw("carouselData") as Array<{
    id: string;
    title: string;
    price: string;
    img: string;
    link: string;
    saveTo: string;
    bgStyle: string;
  }>;
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-5 my-10 px-10">
      {/* Carousel */}
      <div className="md:col-span-2 md:row-span-2">
        <CarouselComponent />
      </div>
      {carouselData.length > 0 &&
        carouselData.map((caro) => (
          <div
            key={caro.id}
            className={`flex items-between justify-center p-10 rounded-xl bg-[${caro.bgStyle}]`}
          >
            <div className="flex flex-col justify-between md:w-50">
              <Link
                href={caro.link}
                className="text-2xl font-semibold hover:text-primary transition-colors"
              >
                {caro.title}
              </Link>
              <p className="text-md">
                {caro.saveTo}
                <strong className="text-primary text-lg px-1">
                  ${caro.price}
                </strong>
              </p>
            </div>
            <Image
              src={caro.img}
              width={200}
              height={200}
              alt={caro.id}
              loading="lazy"
              className="object-contain mx-auto"
            />
          </div>
        ))}
    </section>
  );
};

export default HeroSection;
