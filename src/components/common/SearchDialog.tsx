"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SearchIcon } from "lucide-react";
import { Field } from "../ui/field";
import { Input } from "../ui/input";
import { useTranslations } from "next-intl";

export default function SearchDialog() {
  const t = useTranslations("Header");
  const tabs = t.raw("btns.tabs") as Array<{ title: string }>;

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
            <Field orientation="horizontal">
              <Input
                type="search"
                placeholder={t("btns.searchInput")}
                className="py-6 px-5 rounded-full"
              />
              <Button className="w-fit">{t("btns.searchInputBtn")}</Button>
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
          {Array.from({ length: 100 }).map((_, index) => (
            <p key={index} className="mb-4 leading-normal">
              Lorem ipsum dolor sit amet…
            </p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
