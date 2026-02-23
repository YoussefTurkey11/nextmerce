"use client";

import Pagination from "@/components/common/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllOrdersQuery } from "@/redux/api/orderApi";
import { Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

const InvoiceHistoryPage = () => {
  const t = useTranslations("Invoice");
  const locale = useLocale();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetAllOrdersQuery(page);
  const orders = data?.data?.data;
  const pagination = data?.data?.paginationResult;

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
      {orders.map((order) => (
        <div key={order.id} className="border rounded-lg p-5 space-y-5">
          <h2 className="text-xl font-semibold">
            {t("order")} <span className="font-bold">#{order.orderNumber}</span>
          </h2>

          <p>
            {t("status")}: {order.status}
          </p>
          <p>
            {t("payment")}: {order.paymentMethod}
          </p>
          <p>
            {t("date")}: {new Date(order.createdAt).toLocaleDateString()}
          </p>

          <Table className="mt-5">
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
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="flex items-center gap-3">
                    {item.product.imageCover && (
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title || "product"}
                        width={50}
                        height={50}
                      />
                    )}
                    {item.product.title}
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={2} className="text-lg font-bold">
                  {t("total")}
                </TableCell>
                <TableCell className="font-bold">
                  ${order.totalOrderPrice}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      ))}
      <Pagination page={page} setPage={setPage} pagination={pagination} />
    </section>
  );
};

export default InvoiceHistoryPage;
