"use client";
import { Dispatch, SetStateAction } from "react";
import { TPagination } from "@/types/product";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";

const Pagination = ({
  page,
  setPage,
  pagination,
  isLoading,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  pagination?: TPagination;
  isLoading: boolean;
}) => {
  const t = useTranslations("Pagination");
  return (
    <div className="flex justify-end items-center gap-5 mt-10">
      <Button
        disabled={page === 1 || isLoading}
        onClick={() => setPage((prev) => prev - 1)}
        className="px-4 py-2 w-fit"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animatae-spin" />
        ) : (
          <>{t("previous")}</>
        )}
      </Button>

      <span>
        {t("page")} {pagination?.currentPage ?? 1} {t("of")}{" "}
        {pagination?.totalPages ?? 1}
      </span>

      <Button
        disabled={!pagination?.next || isLoading}
        onClick={() => setPage((prev) => prev + 1)}
        className="px-4 py-2 w-fit"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animatae-spin" />
        ) : (
          <>{t("next")}</>
        )}
      </Button>
    </div>
  );
};

export default Pagination;
