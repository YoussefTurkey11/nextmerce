"use client";
import { useTranslations } from "next-intl";

const Divider = () => {
  const t = useTranslations("Auth.register");
  return (
    <div className="flex items-center gap-2 pt-4 w-full">
      <span className="flex-1 h-px bg-divider"></span>
      <span className="text-onSurface1 text-sm">{t("divider")}</span>
      <span className="flex-1 h-px bg-divider"></span>
    </div>
  );
};

export default Divider;
