"use client";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useLogout";
import { RootState, useAppSelector } from "@/redux/store";
import { useLocale, useTranslations } from "next-intl";

const Profile = () => {
  const t = useTranslations("Profile");
  const user = useAppSelector((state: RootState) => state.auth.user);
  const locale = useLocale();
  const logout = useLogout();
  return (
    <>
      <h3 className="flex items-center gap-2">
        {t("dashboard.title")} {user?.name}
        <div className="flex items-center">
          (
          {locale === "en" ? (
            <p>Not {user?.name}?</p>
          ) : (
            <p>لست {user?.name}؟</p>
          )}
        </div>{" "}
        <Button
          className="w-fit bg-transparent hover:bg-transparent text-destructive hover:underline px-0!"
          onClick={logout}
        >
          {t("dashboard.logOutBtn")}
        </Button>
        )
      </h3>
      <p>{t("dashboard.desc")}</p>
    </>
  );
};

export default Profile;
