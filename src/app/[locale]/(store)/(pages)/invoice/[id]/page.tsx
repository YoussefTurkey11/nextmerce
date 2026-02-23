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
import { CalendarDays, CreditCard, Loader2, ReplyAll } from "lucide-react";
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
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <Button variant={"link"} className="w-fit text-xl p-0!" asChild>
          <Link
            href={`/${locale}/invoiceHistory`}
            className="flex items-center gap-1"
          >
            <span>{t("history")}</span>{" "}
            <ReplyAll className="ltr:scale-x-[-1]" />
          </Link>
        </Button>
      </div>

      <div className="border border-ring/30 rounded-lg p-5 space-y-5">
        <div className="flex items-center gap-2">
          <h2 className="text-2xl font-semibold">
            {t("order")}:{" "}
            <span className="font-bold">#{orders.orderNumber}</span>
          </h2>
          <p className="bg-chart-4/20 border-2 border-chart-4/50 text-chart-5 px-5 py-1 rounded-full capitalize font-semibold">
            {orders.status}
          </p>
        </div>

        <div className="flex items-center gap-5">
          <p className="text-muted-foreground flex items-center gap-2">
            <CalendarDays />
            <span className="font-semibold">
              {new Date(orders.createdAt).toLocaleDateString()}
            </span>
          </p>

          <p className="text-muted-foreground flex items-center gap-2">
            <CreditCard />
            <span className="font-semibold">{orders.paymentMethod}</span>
          </p>
        </div>

        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead
                className={`${locale === "en" ? "text-left" : "text-right"} font-bold text-lg py-5`}
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
                <TableCell className="flex items-center gap-3 py-5">
                  {item.product?.imageCover && (
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title || "product"}
                      width={70}
                      height={70}
                      className="rounded-full"
                    />
                  )}
                  <span className="text-lg">{item.product?.title}</span>
                </TableCell>
                <TableCell className="text-xl">{item.quantity}</TableCell>
                <TableCell className="text-lg">${item.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} className="text-lg font-bold py-5">
                Total
              </TableCell>
              <TableCell className="font-bold text-lg text-primary">
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
