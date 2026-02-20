"use client";
import { useTranslations } from "next-intl";

const Downloads = () => {
  const t = useTranslations("Profile");

  return (
    <>
      <h3>{t("download.noDownloads")}</h3>
    </>
  );
};

export default Downloads;
