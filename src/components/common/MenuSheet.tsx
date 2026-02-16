"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Heart, ShoppingCart, TextAlignJustify, UserRound } from "lucide-react";
import Logo from "./Logo";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import Image from "next/image";
import { User } from "@/types/authTypes";
import CartSheet from "./CartSheet";
import WishSheet from "./WishSheet";
import { DropMenuComponent } from "./DropMenu";
import SearchDialog from "./SearchDialog";

export default function MenuSheet({ user }: { user: User }) {
  const locale = useLocale();
  const t = useTranslations("Header");
  const menuList = t.raw("menu") as Array<{ title: string; link: string }>;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size={"icon-lg"} className="w-fit">
          <TextAlignJustify />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="border-b border-ring/30 pb-5" dir={"ltr"}>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col items-center gap-3 header-btns">
          <SearchDialog />
          <DropMenuComponent />
        </div>
        <ul className="flex flex-col gap-5 px-5">
          {menuList.map((link, idx) => (
            <li
              key={idx}
              className="text-xl not-last:border-b not-last:border-ring/30 pb-5 capitalize"
            >
              <Link href={`/${locale}/${link.link}`}>{link.title}</Link>
            </li>
          ))}
        </ul>
        <SheetFooter className="flex flex-row gap-5 border-t border-ring/30 pt-5">
          {/* Language */}
          <LanguageSwitcher />
          {/* account */}
          {user ? (
            <div className="flex items-center gap-1 cursor-pointer">
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
            </Link>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
