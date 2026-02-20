"use client";
import { useLogout } from "@/hooks/useLogout";
import { User } from "@/types/authTypes";
import {
  BadgeCheckIcon,
  BellIcon,
  CreditCardIcon,
  Heart,
  LogOutIcon,
  ShoppingCart,
  UserRound,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/redux/store";
import { openCart, openWishlist } from "@/redux/slices/uiSlice";
import { useGetAllWishlistsQuery } from "@/redux/api/wishlistApi";
import { useGetAllProductsInCartQuery } from "@/redux/api/cartApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar } from "../ui/avatar";

const AvatarProfile = ({ user }: { user: User }) => {
  const locale = useLocale();
  const logout = useLogout();
  const dispatch = useAppDispatch();
  const t = useTranslations("Header");

  const { data: wishlistData } = useGetAllWishlistsQuery();
  const wishlist = wishlistData?.data;

  const { data: cartData } = useGetAllProductsInCartQuery();
  const cart = cartData?.data?.cartItems;

  return (
    // <div className="flex items-center gap-5">
    //   <div className="flex items-center gap-2 cursor-pointer">
    //     <Link href={`/${locale}/profile`} className="transition-colors">
    //       {user.profileImage ? (
    //         <Image
    //           src={user.profileImage}
    //           width={40}
    //           height={40}
    //           alt={user.name}
    //           loading="lazy"
    //           className="rounded-full"
    //         />
    //       ) : (
    //         <UserRound size={18} />
    //       )}
    //     </Link>
    //     <div className="flex flex-col">
    //       <Link
    //         href={`/${locale}/profile`}
    //         className="text-sm text-primary transition-colors"
    //       >
    //         {user.name}
    //       </Link>
    //       <span
    //         className="text-sm text-ring uppercase hover:underline hover:text-destructive transition-colors"
    //         onClick={logout}
    //       >
    //         {t("btns.logout")}
    //       </span>
    //     </div>
    //   </div>
    //
    // </div>
    <div className="flex items-center gap-5">
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            {user.profileImage ? (
              <Avatar className="w-full h-full">
                <Image
                  src={user.profileImage}
                  width={40}
                  height={40}
                  alt={user?.name || "user"}
                  className="object-cover rounded-full"
                />
              </Avatar>
            ) : (
              <div className="rounded-full ring ring-ring p-3">
                <UserRound size={18} />
              </div>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align={"end"} className="mt-1">
            <DropdownMenuGroup>
              <DropdownMenuItem
                dir={locale === "en" ? "ltr" : "rtl"}
                className="cursor-pointer"
                asChild
              >
                <Link
                  href={`/${locale}/profile`}
                  className="flex items-center gap-2"
                >
                  <BadgeCheckIcon />
                  <span>{t("btns.account.title")}</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              dir={locale === "en" ? "ltr" : "rtl"}
              className="cursor-pointer"
              onClick={logout}
            >
              <LogOutIcon />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {user && (
        <>
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
        </>
      )}
    </div>
  );
};

export default AvatarProfile;
