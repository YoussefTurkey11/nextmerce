"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleCheck, CircleX, Eye, Heart, HeartOff, Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import ProductGallery from "../product/ProductGallery";
import { Badge } from "../ui/badge";
import { QuantityCounter } from "../ui/quantity-counter";
import { TProductItem } from "@/types/product";
import { rating } from "@/utils/rating";
import { addToCart } from "@/redux/slices/cartSlice";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { useState } from "react";
import { toggleWishlist } from "@/redux/slices/wishlistSlice";
import { openWishlist } from "@/redux/slices/uiSlice";

export default function ProductDialog({
  cartItem,
  style,
}: {
  cartItem: TProductItem;
  style?: string;
}) {
  const t = useTranslations("Landpage");
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const wishlistItems = useAppSelector(
    (state: RootState) => state.wishlist.items,
  );
  const isInWishlist = wishlistItems.some((item) => item.id === cartItem.id);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon" className={style}>
          <Eye />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-5xl! py-10">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-5">
          <ProductGallery
            imageCover={cartItem.imageCover}
            images={Array.isArray(cartItem.images) ? cartItem.images : []}
          />

          <div className="space-y-5">
            <Badge variant={"success"} className="py-1 px-2">
              {locale === "en"
                ? `SALE ${cartItem.discountPercentage}% OFF`
                : `خصم ${cartItem.discountPercentage}%`}
            </Badge>
            <h3 className="text-3xl font-semibold capitalize">
              {cartItem.title}
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    fill={
                      i < rating(cartItem) ? "var(--chart-4)" : "var(--ring)"
                    }
                    color={
                      i < rating(cartItem) ? "var(--chart-4)" : "var(--ring)"
                    }
                  />
                ))}
              </div>

              <p className="text-ring">
                <strong className="text-foreground">
                  {`${cartItem.ratingsQuantity} ${locale === "en" ? "reting" : "تقييم"}`}
                </strong>{" "}
                ({" "}
                {`${cartItem.reviews.length} ${locale === "en" ? "reviews" : "مراجعات"}`}{" "}
                )
              </p>
              <div className="flex items-center gap-1 text-sm">
                {cartItem.quantity > 0 ? (
                  locale === "en" ? (
                    <p className="flex items-center gap-1 text-chart-2">
                      <CircleCheck size={20} />
                      <span>In Stock</span>
                    </p>
                  ) : (
                    <p className="flex items-center gap-1 text-chart-2">
                      <CircleCheck size={20} />
                      <span>متوفر</span>
                    </p>
                  )
                ) : locale === "en" ? (
                  <p className="flex items-center gap-1 text-chart-5">
                    <CircleX size={20} />
                    <span>Out of Stock</span>
                  </p>
                ) : (
                  <p className="flex items-center gap-1 text-chart-5">
                    <CircleX size={20} />
                    <span>غير متوفر</span>
                  </p>
                )}
              </div>
            </div>
            <p className="text-muted-foreground line-clamp-3 w-100">
              {cartItem.description}
            </p>
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-lg font-bold">
                  {locale === "en" ? "Price" : "السعر"}
                </p>
                <p className="flex items-center gap-2">
                  <span className="line-through text-muted-foreground text-xl">
                    ${cartItem.priceAfterDiscount}
                  </span>
                  <span className="text-3xl font-semibold">
                    ${cartItem.price}
                  </span>
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-lg font-bold">
                  {locale === "en" ? "Quantity" : "الكمية"}
                </p>
                <QuantityCounter
                  min={1}
                  max={50}
                  onChange={(value) => setSelectedQuantity(value)}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-2 my-5">
              <Button
                className="md:w-40 capitalize"
                onClick={() =>
                  dispatch(
                    addToCart({
                      ...cartItem,
                      quantity: selectedQuantity,
                    }),
                  )
                }
              >
                {t("quickViewItem.addToCart")}
              </Button>
              <Button
                variant={isInWishlist ? "default" : "secondary"}
                className="md:w-50 capitalize flex items-center gap-2"
                onClick={() => {
                  dispatch(toggleWishlist(cartItem));
                  dispatch(openWishlist());
                }}
              >
                {isInWishlist ? (
                  <>
                    <HeartOff />
                    {t("quickViewItem.removeFromWishlist")}
                  </>
                ) : (
                  <>
                    <Heart />
                    {t("quickViewItem.addToWishlist")}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
