"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "use-intl";
import Image from "next/image";
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store";
import { removeFromCart } from "@/redux/slices/cartSlice";
import { closeCart } from "@/redux/slices/uiSlice";

export default function CartSheet() {
  const t = useTranslations("Header");
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const isCartOpen = useAppSelector((state: RootState) => state.ui.isCartOpen);
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.priceAfterDiscount * item.quantity,
    0,
  );

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
                      src={item.imageCover}
                      width={100}
                      height={100}
                      alt={item.title}
                      className="bg-muted rounded-lg"
                    />
                    <div>
                      <p className="font-semibold">
                        {item.title} <span>({item.quantity})</span>
                      </p>
                      <p>
                        {t("cart.price")}: $
                        <span>{item.priceAfterDiscount}</span>
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={"delete"}
                    className="w-5"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    <Trash2 />
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
            <Button className="md:w-40">{t("cart.title")}</Button>
            <Button variant={"secondary"} className="md:w-40">
              {t("cart.checkout")}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
