"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";
import Image from "next/image";

export default function CartSheet() {
  const locale = useLocale();
  const t = useTranslations("Header");

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} className="w-fit px-2! relative">
          <ShoppingCart className="w-6! h-6!" />
          <div className="bg-destructive rounded-full absolute top-1 right-0 text-background text-xs w-4 h-4">
            0
          </div>
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="border-b border-ring/30 pb-5" dir={"ltr"}>
            <p className="text-xl">{t("cart.title")}</p>
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
                  {t("cart.price")}: $<span>99.95</span>
                </p>
              </div>
            </div>
            <Button variant={"delete"} className="w-5">
              <Trash2 />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
