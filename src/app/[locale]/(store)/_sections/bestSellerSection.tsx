"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Eye, Heart, ShoppingCart } from "lucide-react";

const BestSellerSection = () => {
  const t = useTranslations("Landpage");
  const bestSellerData = t.raw("bestSeller.bestSellerData") as Array<{
    id: string;
    img: string;
    link: string;
    title: string;
    price: string;
    oldPrice: string;
  }>;

  return (
    <section className="my-30 px-10">
      <h3 className="text-2xl md:text-3xl font-semibold">
        {t("bestSeller.title")}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
        {bestSellerData.length > 0 &&
          bestSellerData.map((cart) => (
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
                  <div className="flex flex-col items-center gap-2">
                    <h3 className="font-semibold text-lg truncate w-100 hover:text-primary transition-colors text-center">
                      {cart.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="line-through text-ring">
                        ${cart.oldPrice}
                      </span>
                      <strong>${cart.price}</strong>
                    </div>
                  </div>
                  <Image
                    src={cart.img}
                    width={1000}
                    height={1000}
                    alt={cart.title}
                    loading="lazy"
                  />

                  <motion.div
                    variants={{
                      rest: { x: 40, opacity: 0 },
                      hover: { x: 0, opacity: 1 },
                    }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                    className="absolute bottom-15 right-5 flex flex-col items-center gap-2"
                  >
                    <Button variant="secondary" size="icon" className="p-1!">
                      <Eye />
                    </Button>
                    <Button variant="secondary" size="icon" className="p-1!">
                      <ShoppingCart />
                    </Button>
                    <Button variant="secondary" size="icon" className="p-1!">
                      <Heart />
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          ))}
      </div>

      <div className="flex justify-center">
        <Button variant={"secondary"} className="w-100">
          {t("bestSeller.viewBtn")}
        </Button>
      </div>
    </section>
  );
};

export default BestSellerSection;
