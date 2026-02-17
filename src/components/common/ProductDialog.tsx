"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleCheck, Eye, Heart, Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import ProductGallery from "../product/ProductGallery";
import { Badge } from "../ui/badge";
import { QuantityCounter } from "../ui/quantity-counter";
import { TProductItem } from "@/types/product";

export default function ProductDialog({
  cartItem,
  style,
}: {
  cartItem: TProductItem;
  style?: string;
}) {
  const t = useTranslations("Landpage");
  const locale = useLocale();

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
            images={Array.isArray(cartItem.imgGroup) ? cartItem.imgGroup : []}
          />

          <div className="space-y-5">
            <Badge variant={"success"} className="py-1 px-2">
              {cartItem.badge}
            </Badge>
            <h3 className="text-3xl font-semibold capitalize">
              {cartItem.title}
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Star fill="var(--chart-4)" color="var(--chart-4)" size={15} />
                <Star fill="var(--ring)" color="var(--ring)" size={15} />
                <Star fill="var(--ring)" color="var(--ring)" size={15} />
                <Star fill="var(--ring)" color="var(--ring)" size={15} />
                <Star fill="var(--ring)" color="var(--ring)" size={15} />
              </div>
              <p className="text-ring">
                <strong className="text-foreground">
                  {`${cartItem.rating.num} ${cartItem.rating.head}`}
                </strong>{" "}
                ( {`${cartItem.reviews.num} ${cartItem.reviews.head}`} )
              </p>
              <p className="text-chart-2 flex items-center gap-1 text-sm">
                <CircleCheck size={20} /> <span>{cartItem.stock}</span>
              </p>
            </div>
            <p className="text-muted-foreground line-clamp-3 w-100">
              {cartItem.desc}
            </p>
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-lg font-bold">{cartItem.price.head}</p>
                <p className="flex items-center gap-2">
                  <span className="line-through text-muted-foreground text-xl">
                    ${cartItem.price.num}
                  </span>
                  <span className="text-3xl font-semibold">
                    ${cartItem.oldPrice.num}
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
                  onChange={(value) => console.log("Quantity:", value)}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-2 my-5">
              <Button className="md:w-40 capitalize">
                {t("quickViewItem.addToCart")}
              </Button>
              <Button
                variant={"secondary"}
                className="md:w-40 capitalize flex items-center gap-2"
              >
                <Heart /> {t("quickViewItem.addToWishlist")}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
