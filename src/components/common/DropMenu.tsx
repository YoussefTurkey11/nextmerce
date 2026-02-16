"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ChevronUp, Menu } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

export function DropMenuComponent() {
  const [clicked, setClicked] = useState(false);
  const t = useTranslations("Header");
  const locale = useLocale();

  const categoriesData = t.raw("categoryList") as Array<{ title: string }>;

  return (
    <DropdownMenu open={clicked} onOpenChange={setClicked}>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="flex items-center w-70 sm:w-fit">
          <span>
            <Menu />
          </span>
          <span>{t("btns.categories")}</span>
          <span>{clicked ? <ChevronUp /> : <ChevronDown />}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-xl">
        {categoriesData.length > 0 &&
          categoriesData.map((cate, idx) => (
            <DropdownMenuItem
              dir={locale === "en" ? "ltr" : "rtl"}
              key={idx}
              className="cursor-pointer"
            >
              {cate.title}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
