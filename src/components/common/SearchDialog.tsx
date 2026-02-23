"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SearchIcon } from "lucide-react";
import { Field } from "../ui/field";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";
import { useGetProductsQuery } from "@/redux/api/productApi";
import Image from "next/image";
import Link from "next/link";

export default function SearchDialog() {
  const t = useTranslations("Header");
  const tabs = t.raw("btns.tabs") as Array<{ title: string }>;
  const { data: productData } = useGetProductsQuery({ limit: 10 });
  const product = productData?.data;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className=" w-70 sm:w-fit">
          <span>{t("btns.searchBtn")}</span>
          <SearchIcon />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pt-7 pb-3">
            <Field
              orientation="horizontal"
              className="flex flex-col sm:flex-row gap-3"
            >
              <Input
                type="search"
                placeholder={t("btns.searchInput")}
                className="py-6 px-5 rounded-full"
              />
              <Button className="sm:w-fit">{t("btns.searchInputBtn")}</Button>
            </Field>
          </DialogTitle>
          <DialogDescription className="flex items-center gap-3">
            {tabs.map((tab, idx) => (
              <Button
                key={idx}
                variant={"outline"}
                className="w-fit focus:bg-primary focus:text-background rounded-lg"
              >
                {tab.title}
              </Button>
            ))}
          </DialogDescription>
        </DialogHeader>

        <div className="-mx-4 max-h-[50vh] overflow-y-auto px-4">
          {product?.length! > 0 &&
            product?.map((prod) => (
              <Link
                href={prod.id}
                key={prod.id}
                className="flex items-center gap-3 my-5 group"
              >
                <Image
                  src={prod.imageCover}
                  width={70}
                  height={70}
                  alt={prod.title}
                  loading="lazy"
                />
                <p className="text-xl font-semibold group-hover:text-primary">
                  {prod.title}
                </p>
              </Link>
            ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
