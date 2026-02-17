"use client";
import { Button } from "@/components/ui/button";
import { Eye, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import ProductDialog from "@/components/common/ProductDialog";

const NewArrivalSection = () => {
  const t = useTranslations("Landpage");
  const newArrivalData = t.raw("newArrivals.newArrivalData") as Array<{
    id: string;
    img: string;
    link: string;
    title: string;
    price: string;
    oldPrice: string;
  }>;
  return (
    <section className="my-10 px-10">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl md:text-3xl font-semibold">
          {t("newArrivals.title")}
        </h3>
        <Button variant={"secondary"} className="w-fit">
          {t("newArrivals.viewBtn")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-10">
        {newArrivalData.length > 0 &&
          newArrivalData.map((cart) => (
            <div className="flex flex-col gap-5" key={cart.id}>
              <motion.div
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="relative"
              >
                <Link
                  href={cart.link}
                  className="block bg-primary/5 p-5 rounded-md"
                >
                  <Image
                    src={cart.img}
                    width={1000}
                    height={1000}
                    alt={cart.title}
                    loading="lazy"
                  />
                </Link>
                <motion.div
                  variants={{
                    rest: { y: 40, opacity: 0 },
                    hover: { y: 0, opacity: 1 },
                  }}
                  transition={{ duration: 0.1, ease: "easeOut" }}
                  className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2"
                >
                  <ProductDialog />
                  <Button className="w-fit">{t("newArrivals.cartBtn")}</Button>
                  <Button variant="secondary" size="icon">
                    <Heart />
                  </Button>
                </motion.div>
              </motion.div>
              <div className="flex flex-col gap-2">
                <Link
                  href={cart.link}
                  className="font-semibold text-lg truncate hover:text-primary transition-colors"
                >
                  {cart.title}
                </Link>
                <div className="flex items-center gap-2">
                  <strong>${cart.price}</strong>
                  <span className="line-through text-ring">
                    ${cart.oldPrice}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default NewArrivalSection;
