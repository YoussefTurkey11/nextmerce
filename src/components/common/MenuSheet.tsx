"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
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
import { DropMenuComponent } from "./DropMenu";
import SearchDialog from "./SearchDialog";
import { useAppDispatch } from "@/redux/store";
import { openCart, openWishlist } from "@/redux/slices/uiSlice";
import { useGetAllProductsInCartQuery } from "@/redux/api/cartApi";
import { useLogout } from "@/hooks/useLogout";
import { useGetAllWishlistsQuery } from "@/redux/api/wishlistApi";

export default function MenuSheet({ user }: { user: User }) {
  const locale = useLocale();
  const t = useTranslations("Header");
  const dispatch = useAppDispatch();
  const logout = useLogout();
  const menuList = t.raw("menu") as Array<{ title: string; link: string }>;
  const { data } = useGetAllProductsInCartQuery();
  const cart = data?.data.cartItems;
  const { data: wishlistData } = useGetAllWishlistsQuery();
  const wishlist = wishlistData?.data;

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
        {user && (
          <SheetClose asChild>
            <Button
              variant={"destructive"}
              className="w-70 mx-auto"
              onClick={logout}
            >
              {t("btns.logout")}
            </Button>
          </SheetClose>
        )}
        <SheetFooter className="flex flex-row gap-5 border-t border-ring/30 pt-5">
          {/* Language */}
          <LanguageSwitcher />
          {/* account */}
          {user ? (
            <div className="flex items-center gap-5 cursor-pointer">
              <SheetClose asChild>
                <Link href={`/${locale}/profile`}>
                  {user.profileImage ? (
                    <Image
                      src={user.profileImage}
                      width={40}
                      height={40}
                      alt={user.name}
                      loading="lazy"
                      className=""
                    />
                  ) : (
                    <UserRound size={18} />
                  )}
                </Link>
              </SheetClose>

              <Button
                onClick={() => {
                  dispatch(openWishlist());
                }}
                variant={"ghost"}
                className="w-fit px-2! relative"
              >
                <Heart className="w-6! h-6!" />
                <div className="bg-destructive rounded-full absolute top-1 right-0 text-background text-xs w-4 h-4">
                  {wishlist?.length ?? 0}
                </div>
              </Button>
              <Button
                onClick={() => {
                  dispatch(openCart());
                }}
                variant={"ghost"}
                className="w-fit px-2! relative"
              >
                <ShoppingCart className="w-6! h-6!" />
                <div className="bg-destructive rounded-full absolute top-1 right-0 text-background text-xs w-4 h-4">
                  {cart?.length ?? 0}
                </div>
              </Button>
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
