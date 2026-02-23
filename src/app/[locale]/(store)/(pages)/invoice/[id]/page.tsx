"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetSingleOrderQuery } from "@/redux/api/orderApi";
import { Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

const InvoicePage = () => {
  const { id } = useParams();
  const t = useTranslations("Invoice");
  const locale = useLocale();

  const { data, isLoading } = useGetSingleOrderQuery();
  const orders = data?.data.data.find((order) => order.id === id);

  if (isLoading)
    return (
      <div className="flex flex-col items-center gap-5 my-50">
        <Loader2 className="w-30 h-30 animate-spin text-primary" />
        <p>{t("loading")}</p>
      </div>
    );

  if (!orders)
    return (
      <div className="mt-40 text-center text-red-500">{t("orderNotFound")}</div>
    );

  return (
    <section className="mt-40 container mx-auto px-5 md:px-30 space-y-10">
      <div className="border rounded-lg p-5 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {t("order")}{" "}
            <span className="font-bold">#{orders.orderNumber}</span>
          </h2>{" "}
          <Button variant={"link"} className="w-fit p-0!" asChild>
            <Link href={`/${locale}/invoiceHistory`}>{t("history")}</Link>
          </Button>
        </div>

        <p>
          {t("status")}: {orders.status}
        </p>
        <p>
          {t("payment")}: {orders.paymentMethod}
        </p>
        <p>
          {t("date")}: {new Date(orders.createdAt).toLocaleDateString()}
        </p>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className={`${locale === "en" ? "text-left" : "text-right"} font-bold text-lg`}
              >
                {t("product")}
              </TableHead>
              <TableHead
                className={`${locale === "en" ? "text-left" : "text-right"} font-bold text-lg`}
              >
                {t("quantity")}
              </TableHead>
              <TableHead
                className={`${locale === "en" ? "text-left" : "text-right"} font-bold text-lg`}
              >
                {t("price")}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.items?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="flex items-center gap-3">
                  {item.product?.imageCover && (
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title || "product"}
                      width={50}
                      height={50}
                    />
                  )}
                  {item.product?.title}
                </TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} className="text-lg font-bold">
                Total
              </TableCell>
              <TableCell className="font-bold">
                ${orders.totalOrderPrice}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  );
};

export default InvoicePage;
