"use client";
import { DropMenuComponent } from "@/components/common/DropMenu";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import Logo from "@/components/common/Logo";
import MenuSheet from "@/components/common/MenuSheet";
import SearchDialog from "@/components/common/SearchDialog";
import { RootState, useAppSelector } from "@/redux/store";
import { UserRound } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const Header = () => {
  const locale = useLocale();
  const t = useTranslations("Header");
  const user = useAppSelector((state: RootState) => state.auth.user);
  console.log(user);

  return (
    <header className="container mx-auto">
      <nav className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 p-5">
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          {/* Logo */}
          <Logo />
          {/* All Category && Search */}
          <div className="flex items-center gap-3">
            <DropMenuComponent />
            <SearchDialog />
          </div>
        </div>
        <div className="flex items-center gap-5">
          {/* Language */}
          <LanguageSwitcher />
          {/* account */}
          <Link
            href={`/${locale}/login`}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="ring ring-ring group-hover:ring-primary p-3 rounded-full transition-colors">
              <UserRound size={18} />
            </div>
            <div>
              <span className="text-sm text-ring uppercase">
                {t("btns.account.title")}
              </span>
              <p className="text-sm group-hover:text-primary transition-colors">
                {t("btns.account.action")}
              </p>
            </div>
          </Link>
          <MenuSheet />
        </div>
      </nav>
    </header>
  );
};

export default Header;
