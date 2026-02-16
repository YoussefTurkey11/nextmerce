"use client";
import CartSheet from "@/components/common/CartSheet";
import { DropMenuComponent } from "@/components/common/DropMenu";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import Logo from "@/components/common/Logo";
import MenuSheet from "@/components/common/MenuSheet";
import SearchDialog from "@/components/common/SearchDialog";
import WishSheet from "@/components/common/WishSheet";
import { useLogout } from "@/hooks/useLogout";
import { RootState, useAppSelector } from "@/redux/store";
import { UserRound } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const locale = useLocale();
  const t = useTranslations("Header");
  const user = useAppSelector((state: RootState) => state.auth.user);
  const logout = useLogout();

  return (
    <header className="border-b border-ring/30 fixed top-0 w-full z-20 bg-background">
      <nav className="container mx-auto flex lg:items-center justify-between gap-5 px-5 md:px-30 py-5 ">
        <div className="flex items-center gap-5">
          {/* Logo */}
          <Logo />

          {/* All Category && Search */}
          <div className="hidden sm:flex items-center gap-3 header-btns">
            <DropMenuComponent />
            <SearchDialog />
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-5">
          {/* Language */}
          <LanguageSwitcher />
          {/* account */}
          {user ? (
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-2 cursor-pointer">
                <Link
                  href={`/${locale}/profile`}
                  className="ring ring-primary p-3 rounded-full transition-colors"
                >
                  {user.profile ? (
                    <Image
                      src={user.profile}
                      width={30}
                      height={30}
                      alt={user.name}
                      loading="lazy"
                      className=""
                    />
                  ) : (
                    <UserRound size={18} />
                  )}
                </Link>
                <div className="flex flex-col">
                  <Link
                    href={`/${locale}/profile`}
                    className="text-sm text-primary transition-colors"
                  >
                    {user.name}
                  </Link>
                  <span
                    className="text-sm text-ring uppercase hover:underline hover:text-destructive transition-colors"
                    onClick={logout}
                  >
                    {t("btns.logout")}
                  </span>
                </div>
              </div>
              <WishSheet />
              <CartSheet />
            </div>
          ) : (
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
          )}
        </div>
        <div className="flex lg:hidden">
          <MenuSheet user={user!} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
