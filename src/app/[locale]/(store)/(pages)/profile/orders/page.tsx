"use client";

import Pagination from "@/components/common/Pagination";
import { SkeletonCard } from "@/components/common/SkeletonCard";
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
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

const Orders = () => {
  const t = useTranslations("Profile");
  const locale = useLocale();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetAllOrdersQuery(page);
  const orders = data?.data?.data;
  const pagination = data?.data?.paginationResult;
  const totalPrice = orders?.find((i) => i.totalOrderPrice)?.totalOrderPrice;

  if (isLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-5">
        {Array.from({ length: 4 }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    );

  return (
    <>
      {orders ? (
        <>
          <Table className="mt-5">
            <TableHeader className="bg-muted">
              <TableRow>
                <TableHead
                  className={`${locale === "en" ? "text-left" : "text-right"} font-bold text-lg py-5`}
                >
                  {t("order.product")}
                </TableHead>
                <TableHead
                  className={`${locale === "en" ? "text-left" : "text-right"} font-bold text-lg`}
                >
                  {t("order.quantity")}
                </TableHead>
                <TableHead
                  className={`${locale === "en" ? "text-left" : "text-right"} font-bold text-lg`}
                >
                  {t("order.price")}
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((item) =>
                item.items.map((it) => (
                  <TableRow key={it.id}>
                    <TableCell className="flex items-center gap-3 py-5 overflow-x-scroll md:overflow-hidden w-50  md:w-full">
                      {it.product.imageCover && (
                        <Image
                          src={it.product.imageCover}
                          alt={it.product.title || "product"}
                          width={70}
                          height={70}
                          className="rounded-full"
                        />
                      )}
                      <span className="text-lg">{it.product.title}</span>
                    </TableCell>
                    <TableCell className="text-lg">{it.quantity}</TableCell>
                    <TableCell className="text-lg">${it.price}</TableCell>
                  </TableRow>
                )),
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={2} className="text-lg font-bold py-5">
                  {t("order.total")}
                </TableCell>
                <TableCell className="font-bold text-lg text-primary">
                  ${totalPrice}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          <Pagination
            page={page}
            setPage={setPage}
            pagination={pagination}
            isLoading={isLoading}
          />
        </>
      ) : (
        <h3>{t("order.noOrders")}</h3>
      )}
    </>
  );
};

export default Orders;
