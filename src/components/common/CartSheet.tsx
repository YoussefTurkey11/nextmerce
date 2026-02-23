"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Loader2, Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "use-intl";
import Image from "next/image";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { closeCart } from "@/redux/slices/uiSlice";
import {
  useDeleteProductsInCartMutation,
  useGetAllProductsInCartQuery,
} from "@/redux/api/cartApi";
import { useState } from "react";
import Link from "next/link";

export default function CartSheet() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const isCartOpen = useAppSelector((state: RootState) => state.ui.isCartOpen);
  const { data } = useGetAllProductsInCartQuery();
  const [deleteProduct, { isLoading: isDeleteLoading }] =
    useDeleteProductsInCartMutation();
  const cartItems = data?.data?.cartItems ?? [];
  const subTotal = data?.data?.totalPrice ?? 0;

  const [deletingId, setDeletingId] = useState<string | null>(null);

  return (
    <Sheet
      open={isCartOpen}
      onOpenChange={(open) => {
        if (!open) dispatch(closeCart());
      }}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="border-b border-ring/30 pb-5" dir={"ltr"}>
            <p className="text-xl">{t("cart.title")}</p>
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-5 p-5">
          <div className="flex flex-col gap-5 p-5">
            {cartItems.length === 0 ? (
              <p className="text-center text-muted-foreground">
                {locale === "en" ? "Cart is empty" : "السلة فارغة"}
              </p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-start justify-between">
                  <div className="flex gap-2 w-70">
                    <Image
                      src={item.product.imageCover}
                      width={100}
                      height={100}
                      alt={item.product.title}
                      className="bg-muted rounded-lg"
                    />
                    <div>
                      <p className="font-semibold">
                        {item.product.title} <span>({item.quantity})</span>
                      </p>
                      <p>
                        {t("cart.price")}: $
                        <span>{item.product.priceAfterDiscount}</span>
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={"delete"}
                    className="w-5"
                    disabled={deletingId === item.id}
                    onClick={async () => {
                      try {
                        setDeletingId(item.id);
                        await deleteProduct(item.id).unwrap();
                      } finally {
                        setDeletingId(null);
                      }
                    }}
                  >
                    {deletingId === item.id ? (
                      <Loader2 className="h-5 w-5 animate-spin text-red-500" />
                    ) : (
                      <Trash2 className="h-5 w-5" />
                    )}
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
        <SheetFooter className="border-t border-ring/30 py-5">
          <div className="flex items-center justify-between">
            <h4 className="text-lg md:text-2xl font-semibold">
              {t("cart.subTotal")}:
            </h4>
            <p className="text-lg font-semibold">${subTotal.toFixed(2)}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 my-5">
            <Button
              className="md:w-40"
              asChild
              onClick={() => dispatch(closeCart())}
            >
              <Link href={`/${locale}/cart`}>{t("cart.title")}</Link>
            </Button>
            <Button
              variant={"secondary"}
              className="md:w-40"
              asChild
              onClick={() => dispatch(closeCart())}
            >
              <Link href={`/${locale}/checkout`}>{t("cart.checkout")}</Link>
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
