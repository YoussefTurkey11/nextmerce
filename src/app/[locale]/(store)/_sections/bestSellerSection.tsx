"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import ProductDialog from "@/components/common/ProductDialog";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useGetProductsQuery } from "@/redux/api/productApi";
import { SkeletonCard } from "@/components/common/SkeletonCard";
import { addToCart } from "@/redux/slices/cartSlice";
import { toggleWishlist } from "@/redux/slices/wishlistSlice";
import { openCart, openWishlist } from "@/redux/slices/uiSlice";

const BestSellerSection = () => {
  const t = useTranslations("Landpage");
  const wishlistItems = useAppSelector(
    (state: RootState) => state.wishlist.items,
  );
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetProductsQuery({ limit: 8, page: 1 });
  const product = data?.data ?? [];

  if (isLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    );

  return (
    <section className="my-30 px-10">
      <h3 className="text-2xl md:text-3xl font-semibold">
        {t("bestSeller.title")}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
        {product.length > 0 &&
          product.map((cart) => {
            const isInWishlist = wishlistItems.some(
              (item) => item.id === cart.id,
            );

            return (
              <div className="flex flex-col gap-5" key={cart.id}>
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  className="relative"
                >
                  <Link
                    href={cart.id}
                    className="flex flex-col items-center justify-center gap-5 bg-primary/5 py-5 rounded-md min-h-140"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <h3 className="font-semibold text-lg truncate w-50 lg:w-100 hover:text-primary transition-colors text-center">
                        {cart.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="line-through text-ring">
                          ${cart.price}
                        </span>
                        <strong>${cart.priceAfterDiscount}</strong>
                      </div>
                    </div>
                    <Image
                      src={cart.imageCover}
                      width={1000}
                      height={1000}
                      alt={cart.title}
                      loading="lazy"
                    />
                  </Link>
                  <motion.div
                    variants={{
                      rest: { x: 40, opacity: 0 },
                      hover: { x: 0, opacity: 1 },
                    }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                    className="absolute bottom-15 right-5 flex flex-col items-center gap-2"
                  >
                    <ProductDialog cartItem={cart} style="p-1!" />
                    <Button
                      variant="secondary"
                      size="icon"
                      className="p-1!"
                      onClick={() => {
                        dispatch(
                          addToCart({
                            ...cart,
                            quantity: 1,
                          }),
                        );
                        dispatch(openCart());
                      }}
                    >
                      <ShoppingCart />
                    </Button>
                    <Button
                      variant={isInWishlist ? "default" : "secondary"}
                      size="icon"
                      onClick={() => {
                        dispatch(toggleWishlist(cart));
                        dispatch(openWishlist());
                      }}
                    >
                      <Heart />
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            );
          })}
      </div>

      <div className="flex justify-center">
        <Button variant={"secondary"} className="w-fit md:w-100">
          {t("bestSeller.viewBtn")}
        </Button>
      </div>
    </section>
  );
};

export default BestSellerSection;
