"use client";
import CarouselComponent from "@/components/common/Carousel";
import { MessageSquareMore, Repeat2, Rocket, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const iconMap = {
  Rocket,
  Repeat2,
  ShieldCheck,
  MessageSquareMore,
};

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
  const prosData = t.raw("prosData") as Array<{
    id: string;
    title: string;
    desc: string;
    icon: keyof typeof iconMap;
  }>;
  return (
    <section className="my-10 px-10">
      {/* Carousel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-5">
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
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full lg:px-25 py-15">
        {prosData.length > 0 &&
          prosData.map((pros) => {
            const IconComponent = iconMap[pros.icon];
            return (
              <div key={pros.id} className="flex items-start gap-3">
                {IconComponent && <IconComponent size={30} />}
                <div className="flex flex-col">
                  <p className="text-lg font-semibold">{pros.title}</p>
                  <span className="text-sm text-ring">{pros.desc}</span>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default HeroSection;
