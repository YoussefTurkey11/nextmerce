"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Button } from "../ui/button";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLanguage = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        switchLanguage(locale === "en" ? "ar" : "en");
      }}
      variant="secondary"
      className="flex items-center w-fit"
    >
      <Globe size={10} />
      <span className="text-sm">{locale === "en" ? "Arabic" : "إنجليزية"}</span>
    </Button>
  );
}
