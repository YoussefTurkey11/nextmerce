"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAddProductsToCartMutation } from "@/redux/api/cartApi";
import {
  useDeleteWishlistMutation,
  useGetAllWishlistsQuery,
} from "@/redux/api/wishlistApi";
import { openCart } from "@/redux/slices/uiSlice";
import { useAppDispatch } from "@/redux/store";
import { CircleCheck, CircleX, FolderHeart, Loader2, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const WishlistPage = () => {
  const t = useTranslations("Wishlist");
  const tableHead = t.raw("tableHead") as Array<{
    head: string;
  }>;
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const { data: wishlistData } = useGetAllWishlistsQuery();
  const [deleteItem] = useDeleteWishlistMutation();
  const [addItem] = useAddProductsToCartMutation();

  const [deletedId, setDeletedId] = useState<string | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);
  const wishlist = wishlistData?.data;

  return (
    <section
      className={`mt-40 container mx-auto px-5 md:px-30 ${wishlist?.length! > 0 ? "min-h-screen" : ""}`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-semibold capitalize">{t("title")}</h1>
      </div>

      {wishlist?.length! > 0 ? (
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
            {wishlist?.map((wish) => (
              <TableRow key={wish.id} className="text-center">
                <TableCell className="flex items-center gap-2">
                  <Button
                    variant={"delete"}
                    className="w-fit p-3! mx-5"
                    disabled={deletedId === wish.id}
                    onClick={async () => {
                      try {
                        setDeletedId(wish.id);
                        await deleteItem(wish.id).unwrap();
                        toast.success(t("response.successRemove"));
                      } catch {
                        toast.success(t("response.errorRemove"));
                      } finally {
                        setDeletedId(null);
                      }
                    }}
                  >
                    {deletedId === wish.id ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <X />
                    )}
                  </Button>
                  <Image
                    src={wish.imageCover}
                    width={60}
                    height={60}
                    alt={wish.title}
                    loading="lazy"
                    className="object-contain rounded-full"
                  />
                  <p className="text-xl font-semibold">{wish.title}</p>
                </TableCell>
                <TableCell className="text-xl font-bold">
                  ${wish.priceAfterDiscount}
                </TableCell>
                <TableCell className="text-lg font-bold">
                  {wish.quantity > 0 ? (
                    locale === "en" ? (
                      <p className="flex items-center justify-center gap-1 text-chart-2">
                        <CircleCheck size={15} />
                        <span>In Stock</span>
                      </p>
                    ) : (
                      <p className="flex items-center justify-center gap-1 text-chart-2">
                        <CircleCheck size={15} />
                        <span>متوفر</span>
                      </p>
                    )
                  ) : locale === "en" ? (
                    <p className="flex items-center justify-center gap-1 text-chart-5">
                      <CircleX size={15} />
                      <span>Out of Stock</span>
                    </p>
                  ) : (
                    <p className="flex items-center justify-center gap-1 text-chart-5">
                      <CircleX size={15} />
                      <span>غير متوفر</span>
                    </p>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    className="w-fit"
                    disabled={addedId === wish.id}
                    onClick={async () => {
                      try {
                        setAddedId(wish.id);
                        await addItem({ productId: wish.id }).unwrap();
                        toast.success(t("response.successAdd"));
                        dispatch(openCart());
                      } catch {
                        toast.error(t("response.errorAdd"));
                      } finally {
                        setAddedId(null);
                      }
                    }}
                  >
                    {addedId === wish.id ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      t("addToCart")
                    )}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-col gap-5 items-center my-25">
          <FolderHeart size={100} color="var(--primary)" />
          <h3 className="text-xl font-semibold">{t("emptyTitle")}</h3>
          <Button asChild className="md:w-100">
            <Link href={`/${locale}/`}>{t("continueShopping")}</Link>
          </Button>
        </div>
      )}
    </section>
  );
};

export default WishlistPage;
