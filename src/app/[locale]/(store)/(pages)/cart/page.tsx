"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  CartCouponFormDataSchema,
  cartCouponSchema,
} from "@/validations/cartCoupone/cartCoupone.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Store, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CartPage = () => {
  const t = useTranslations("Cart");
  const locale = useLocale();
  const tableHead = t.raw("tableHead") as Array<{
    head: string;
  }>;
  const { data: cartData, refetch } = useGetAllProductsInCartQuery();
  const [clearCart] = useClearCartContentMutation();
  const [deleteItemFromCart] = useDeleteProductsInCartMutation();

  const [deletedId, setDeletedId] = useState<string | null>(null);
  const cart = cartData?.data.cartItems;

  console.log(cartData?.data);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CartCouponFormDataSchema>({
    resolver: zodResolver(cartCouponSchema(t)),
    mode: "onChange",
  });
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
                await refetch();
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="col-span-2">
            <Table className="mt-10 border border-ring/30">
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
                      <p className="text-xl font-semibold">
                        {cart.product.title}
                      </p>
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
          </div>

          <form className="border border-ring/30 rounded-lg p-5 h-fit">
            <h4 className="text-lg font-semibold pb-5 border-b border-ring/30">
              {t("coupon.title")}
            </h4>
            <div className="flex items-center gap-5 mt-5">
              <div className="flex flex-col w-full">
                <Input
                  {...register("coupon")}
                  placeholder={t("coupon.placeholder")}
                  type={"text"}
                  className="py-5.5 px-5 rounded-full bg-background"
                />
                {errors && (
                  <p className="text-destructive text-sm mt-1">
                    {errors?.coupon?.message as string}
                  </p>
                )}
              </div>

              <Button className="w-fit" type="submit" disabled={isSubmitting}>
                {t("coupon.applyBtn")}
              </Button>
            </div>
          </form>

          <div className="border border-ring/30 rounded-lg p-5">
            <h4 className="text-lg font-semibold pb-5 border-b border-ring/30">
              {t("coupon.title")}
            </h4>

            <div>
              <div className="flex items-center justify-between border-b border-ring/30 py-5">
                <p className="text-lg font-bold">{t("orderSummary.product")}</p>
                <p className="text-md font-bold">
                  {t("orderSummary.subtotal")}
                </p>
              </div>
              {cart?.map((cart) => (
                <div
                  key={cart.id}
                  className="flex items-center justify-between border-b border-ring/30 py-5"
                >
                  <p className="text-lg font-semibold text-muted-foreground">
                    {cart.product.title}
                  </p>
                  <p className="text-md font-semibold text-muted-foreground">
                    ${cart.product.priceAfterDiscount}
                  </p>
                </div>
              ))}
              <div className="flex items-center justify-between py-5">
                <p className="text-lg font-bold">{t("orderSummary.total")}</p>
                <p className="text-lg font-bold">
                  ${cartData?.data.totalPrice}
                </p>
              </div>
            </div>
            <Button>{t("orderSummary.btn")}</Button>
          </div>
        </div>
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
