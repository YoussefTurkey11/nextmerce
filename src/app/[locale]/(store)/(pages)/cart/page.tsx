"use client";

import { Button } from "@/components/ui/button";
import { QuantityCounter } from "@/components/ui/quantity-counter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useClearCartContentMutation,
  useDeleteProductsInCartMutation,
  useGetAllProductsInCartQuery,
} from "@/redux/api/cartApi";
import { CircleCheck, CircleX, Loader2, Store, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const CartPage = () => {
  const t = useTranslations("Cart");
  const locale = useLocale();
  const tableHead = t.raw("tableHead") as Array<{
    head: string;
  }>;
  const { data: cartData } = useGetAllProductsInCartQuery();
  const [clearCart] = useClearCartContentMutation();
  const [deleteItemFromCart] = useDeleteProductsInCartMutation();

  const [deletedId, setDeletedId] = useState<string | null>(null);
  const cart = cartData?.data.cartItems;
  return (
    <section
      className={`mt-40 container mx-auto px-5 md:px-30 ${cart?.length! > 0 ? "min-h-screen" : ""}`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-semibold capitalize">{t("title")}</h1>
        {cart?.length! > 0 ? (
          <Button
            variant={"link"}
            className="w-fit p-0!"
            onClick={async () => {
              try {
                await clearCart().unwrap();
                toast.success("All items removed from cart successfully");
              } catch {
                toast.error("Items cannot be removed from cart");
              }
            }}
          >
            {t("clearBtn")}
          </Button>
        ) : null}
      </div>

      {cart?.length! > 0 ? (
        <Table className="my-10 border border-ring/30">
          <TableHeader className="bg-muted">
            <TableRow>
              {tableHead.map((head) => (
                <TableHead
                  key={head.head}
                  className="text-center text-lg font-semibold"
                >
                  {head.head}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {cart?.map((cart) => (
              <TableRow key={cart.id} className="text-center">
                <TableCell className="flex items-center gap-2">
                  <Image
                    src={cart.product.imageCover}
                    width={60}
                    height={60}
                    alt={cart.product.title}
                    loading="lazy"
                    className="object-contain rounded-full"
                  />
                  <p className="text-xl font-semibold">{cart.product.title}</p>
                </TableCell>
                <TableCell className="text-xl font-bold">
                  ${cart.product.price}
                </TableCell>
                <TableCell>${cart.product.priceAfterDiscount}</TableCell>
                <TableCell>
                  <Button
                    variant={"delete"}
                    className="w-fit p-3! mx-5"
                    disabled={deletedId === cart.id}
                    onClick={async () => {
                      try {
                        setDeletedId(cart.id);
                        await deleteItemFromCart(cart.id).unwrap();
                        toast.success(t("response.successRemove"));
                      } catch {
                        toast.error(t("response.errorRemove"));
                      } finally {
                        setDeletedId(null);
                      }
                    }}
                  >
                    {deletedId === cart.id ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <X />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col gap-5 items-center my-25">
          <Store size={100} color="var(--primary)" />
          <h3 className="text-xl font-semibold">{t("emptyTitle")}</h3>
          <Button asChild className="md:w-100">
            <Link href={`/${locale}/`}>{t("continueShopping")}</Link>
          </Button>
        </div>
      )}
    </section>
  );
};

export default CartPage;
