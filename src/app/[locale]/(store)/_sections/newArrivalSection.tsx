"use client";
import { Button } from "@/components/ui/button";
import { Eye, Heart, HeartOff, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import ProductDialog from "@/components/common/ProductDialog";
import { useGetProductsQuery } from "@/redux/api/productApi";
import { SkeletonCard } from "@/components/common/SkeletonCard";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { openAuthDialog, openCart } from "@/redux/slices/uiSlice";
import { useAddProductsToCartMutation } from "@/redux/api/cartApi";
import toast from "react-hot-toast";
import { useState } from "react";
import {
  useCreateWishlistMutation,
  useDeleteWishlistMutation,
  useGetAllWishlistsQuery,
} from "@/redux/api/wishlistApi";

const NewArrivalSection = () => {
  const t = useTranslations("Landpage");
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const { data, isLoading } = useGetProductsQuery({ limit: 8, page: 1 });
  const { data: wishlistData } = useGetAllWishlistsQuery();
  const [addToCart] = useAddProductsToCartMutation();
  const [addToWishlist, { isLoading: isWishlistLoading }] =
    useCreateWishlistMutation();
  const [deleteWishlist, { isLoading: isDeleteLoading }] =
    useDeleteWishlistMutation();

  const product = data?.data ?? [];
  const [addingCartId, setAddingCartId] = useState<string | null>(null);
  const [addingWishlistId, setAddingWishlistId] = useState<string | null>(null);
  const [toggleId, setToggleId] = useState<string | null>(null);

  if (isLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    );

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
        {product.length > 0 &&
          product.map((cart) => {
            const wishlistItem = wishlistData?.data.find(
              (item) => item.id === cart.id,
            );
            const isInWishlist = !!wishlistItem;

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
                    className="flex items-center justify-center bg-muted-foreground/5 p-5 rounded-md min-h-80"
                  >
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
                      rest: { y: 40, opacity: 0 },
                      hover: { y: 0, opacity: 1 },
                    }}
                    transition={{ duration: 0.1, ease: "easeOut" }}
                    className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2"
                  >
                    <ProductDialog cartItem={cart} />
                    <Button
                      className="w-fit"
                      disabled={addingCartId === cart.id}
                      onClick={async () => {
                        try {
                          if (user) {
                            setAddingCartId(cart.id);
                            await addToCart({ productId: cart.id }).unwrap();
                            dispatch(openCart());
                          } else {
                            dispatch(openAuthDialog());
                          }
                        } catch {
                          toast.error(
                            locale === "en"
                              ? "Can not add to cart"
                              : "لا نستطيع إضافتها في السلة",
                          );
                        } finally {
                          setAddingCartId(null);
                        }
                      }}
                    >
                      {addingCartId === cart.id ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        t("newArrivals.cartBtn")
                      )}
                    </Button>
                    <Button
                      variant={isInWishlist ? "default" : "secondary"}
                      size="icon"
                      disabled={addingWishlistId === cart.id}
                      onClick={async () => {
                        try {
                          if (!user) {
                            dispatch(openAuthDialog());
                            return;
                          }

                          setToggleId(cart.id);
                          setAddingWishlistId(cart.id);

                          if (isInWishlist && wishlistItem) {
                            await deleteWishlist(wishlistItem.id).unwrap();
                            toast.success(
                              locale === "en"
                                ? "Removed from wishlist"
                                : "تمت الإزالة من المفضلة",
                            );
                          } else {
                            await addToWishlist({
                              productId: cart.id,
                            }).unwrap();

                            toast.success(
                              locale === "en"
                                ? "Added to wishlist"
                                : "تمت الإضافة إلى المفضلة",
                            );
                          }
                        } catch {
                          toast.error(
                            locale === "en"
                              ? "Wishlist action failed"
                              : "فشل تعديل المفضلة",
                          );
                        } finally {
                          setToggleId(null);
                          setAddingWishlistId(null);
                        }
                      }}
                    >
                      {addingWishlistId === cart.id ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : isInWishlist ? (
                        <HeartOff />
                      ) : (
                        <Heart />
                      )}
                    </Button>
                  </motion.div>
                </motion.div>
                <div className="flex flex-col gap-2">
                  <Link
                    href={cart.id}
                    className="font-semibold text-lg truncate hover:text-primary transition-colors"
                  >
                    {cart.title}
                  </Link>
                  <div className="flex items-center gap-2">
                    <strong>${cart.priceAfterDiscount}</strong>
                    <span className="line-through text-ring">
                      ${cart.price}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default NewArrivalSection;
