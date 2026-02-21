"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { HeartOff } from "lucide-react";
import { useLocale, useTranslations } from "use-intl";
import Image from "next/image";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { closeWishlist } from "@/redux/slices/uiSlice";
import {
  useDeleteWishlistMutation,
  useGetAllWishlistsQuery,
} from "@/redux/api/wishlistApi";
import toast from "react-hot-toast";
import Link from "next/link";

export default function WishSheet() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const isWishlistOpen = useAppSelector(
    (state: RootState) => state.ui.isWishlistOpen,
  );
  const { data: wishlistData } = useGetAllWishlistsQuery();
  const [deleteWishlist] = useDeleteWishlistMutation();
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
            {wishlistData?.data.length === 0 ? (
              <p className="text-center text-muted-foreground">
                {locale === "en" ? "WishList is empty" : "المفضلة فارغة"}
              </p>
            ) : (
              wishlistData?.data.map((item) => (
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
                    onClick={async () => {
                      try {
                        await deleteWishlist(item.id).unwrap();
                      } catch {
                        toast.error(
                          locale === "en"
                            ? "Can not add to wishlist"
                            : "لا نستطيع إضافتها في المفضلة",
                        );
                      }
                    }}
                  >
                    <HeartOff />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
        <SheetFooter className="border-t border-ring/30 py-5">
          <SheetClose asChild>
            <Button asChild>
              <Link href={`/${locale}/wishlist`}>{t("wishlist.viewPage")}</Link>
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
