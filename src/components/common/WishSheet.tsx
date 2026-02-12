"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CirclePlus, Heart } from "lucide-react";
import { useTranslations } from "use-intl";
import Image from "next/image";

export default function WishSheet() {
  const t = useTranslations("Header");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} className="w-fit px-2! relative">
          <Heart className="w-6! h-6!" />
          <div className="bg-destructive rounded-full absolute top-1 right-0 text-background text-xs w-4 h-4">
            0
          </div>
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="border-b border-ring/30 pb-5" dir={"ltr"}>
            <p className="text-xl">{t("wishlist.title")}</p>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-5 p-5">
          <div className="flex items-start justify-between">
            <div className="flex gap-2 w-70">
              <Image
                src={"/images/products/capa.webp"}
                width={100}
                height={100}
                alt=""
                loading="lazy"
                className="bg-muted rounded-lg"
              />
              <div>
                <p className="font-semibold">
                  Portable Electric Grinder Maker <span>(1)</span>
                </p>
                <p>
                  {t("wishlist.price")}: $<span>99.95</span>
                </p>
              </div>
            </div>
            <Button className="w-5">
              <CirclePlus />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
