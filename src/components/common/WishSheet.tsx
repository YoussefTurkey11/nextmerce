"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { HeartOff, Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "use-intl";
import Image from "next/image";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { removeFromWishlist } from "@/redux/slices/wishlistSlice";
import { closeWishlist } from "@/redux/slices/uiSlice";

export default function WishSheet() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const wishlistItems = useAppSelector(
    (state: RootState) => state.wishlist.items,
  );
  const isWishlistOpen = useAppSelector(
    (state: RootState) => state.ui.isWishlistOpen,
  );
  const dispatch = useAppDispatch();

  return (
    <Sheet
      open={isWishlistOpen}
      onOpenChange={(open) => {
        if (!open) dispatch(closeWishlist());
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="border-b border-ring/30 pb-5" dir={"ltr"}>
            <p className="text-xl">{t("wishlist.title")}</p>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-5 p-5">
          <div className="flex flex-col gap-5 p-5">
            {wishlistItems.length === 0 ? (
              <p className="text-center text-muted-foreground">
                {locale === "en" ? "WishList is empty" : "المفضلة فارغة"}
              </p>
            ) : (
              wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 w-70">
                    <Image
                      src={item.imageCover}
                      width={70}
                      height={70}
                      alt={item.title}
                      className="bg-muted rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{item.title}</p>
                    </div>
                  </div>
                  <Button
                    variant={"delete"}
                    className="w-5"
                    onClick={() => dispatch(removeFromWishlist(item.id))}
                  >
                    <HeartOff />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
