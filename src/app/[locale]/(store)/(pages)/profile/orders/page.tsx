"use client";

import { SkeletonCard } from "@/components/common/SkeletonCard";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllOrdersQuery } from "@/redux/api/orderApi";
import { useTranslations } from "next-intl";

const Orders = () => {
  const t = useTranslations("Profile");
  const { data: orderData, isLoading } = useGetAllOrdersQuery();
  const order = orderData?.data?.data;
  console.log(order);

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
      {order.length > 0 ? (
        <Table>
          <TableHeader className="text-center">
            <TableRow>
              <TableHead>{t("order.tableHead.order")}</TableHead>
              <TableHead>{t("order.tableHead.date")}</TableHead>
              <TableHead>{t("order.tableHead.status")}</TableHead>
              <TableHead>{t("order.tableHead.title")}</TableHead>
              <TableHead>{t("order.tableHead.total")}</TableHead>
              <TableHead>{t("order.tableHead.action")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <h3>{t("order.noOrders")}</h3>
      )}
    </>
  );
};

export default Orders;
