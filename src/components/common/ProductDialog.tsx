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
import { useTranslations } from "next-intl";
import ProductGallery from "../product/ProductGallery";
import { Badge } from "../ui/badge";
import { QuantityCounter } from "../ui/quantity-counter";

export default function ProductDialog({ style }: { style: string }) {
  const t = useTranslations("Landpage");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon" className={style}>
          <Eye />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-5xl!">
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-5">
          <ProductGallery
            images={[
              "/images/products/capa.webp",
              "/images/products/iphone.webp",
              "/images/products/mob.webp",
            ]}
          />

          <div className="space-y-5">
            <Badge variant={"success"} className="py-1 px-2">
              {t("quickViewItem.badge")}
            </Badge>
            <h3 className="text-3xl font-semibold capitalize">
              {t("quickViewItem.title")}
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
                  0 {t("quickViewItem.rating")}
                </strong>{" "}
                ( 0{t("quickViewItem.reviews")} )
              </p>
              <p className="text-chart-2 flex items-center gap-1 text-sm">
                <CircleCheck size={20} />{" "}
                <span>{t("quickViewItem.stock")}</span>
              </p>
            </div>
            <p className="text-muted-foreground line-clamp-3 w-100">
              {t("quickViewItem.desc")}
            </p>
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-lg font-bold">{t("quickViewItem.price")}</p>
                <p className="flex items-center gap-2">
                  <span className="line-through text-muted-foreground text-xl">
                    $888
                  </span>
                  <span className="text-3xl font-semibold">$777</span>
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-lg font-bold">
                  {t("quickViewItem.quantity")}
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
