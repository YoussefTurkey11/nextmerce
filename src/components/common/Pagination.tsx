"use client";
import { Dispatch, SetStateAction } from "react";
import { TPagination } from "@/types/product";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

const Pagination = ({
  page,
  setPage,
  pagination,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  pagination?: TPagination;
}) => {
  const t = useTranslations("Pagination");
  return (
    <div className="flex justify-end items-center gap-5 mt-10">
      <Button
        disabled={page === 1}
        onClick={() => setPage((prev) => prev - 1)}
        className="px-4 py-2 w-fit"
      >
        {t("previous")}
      </Button>

      <span>
        {t("page")} {pagination?.currentPage ?? 1} {t("of")}{" "}
        {pagination?.totalPages ?? 1}
      </span>

      <Button
        disabled={!pagination?.next}
        onClick={() => setPage((prev) => prev + 1)}
        className="px-4 py-2 w-fit"
      >
        {t("next")}
      </Button>
    </div>
  );
};

export default Pagination;
