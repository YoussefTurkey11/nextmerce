"use client";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useLogout";
import { RootState, useAppSelector } from "@/redux/store";
import {
  Download,
  LayoutDashboard,
  LogOut,
  MapPin,
  ShoppingBag,
  User,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AccountLayount = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  const locale = useLocale();
  const logout = useLogout();
  const pathname = usePathname();
  const t = useTranslations("Profile");
  const layoutData = t.raw("layoutData") as Array<{
    id: string;
    name: string;
    link: string;
  }>;

  const iconMap: Record<string, React.ReactNode> = {
    "/": <LayoutDashboard size={20} />,
    "/orders": <ShoppingBag size={20} />,
    "/addresses": <MapPin size={20} />,
    "/details": <User size={20} />,
  };

  const isActive = (link: string) => {
    const fullPath = `/${locale}/profile${link}`;

    if (link === "/") {
      return pathname === `/${locale}/profile`;
    }

    return pathname.startsWith(fullPath);
  };

  return (
    <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-40 min-h-[calc(100vh - 645.23px)] container mx-auto px-5 md:px-30">
      <div className="border border-ring/30 rounded-lg p-5 xl:col-span-3">
        <div className="flex items-center gap-3 border-b border-ring/30 p-5">
          <Avatar size="lg">
            <Image
              src={
                user?.profileImage
                  ? user?.profileImage
                  : "/images/products/user.png"
              }
              width={100}
              height={100}
              alt={user?.name ? user?.name : "user"}
              loading="lazy"
            />
          </Avatar>
          <div className="flex flex-col">
            <h2 className="font-semibold text-xl">{user?.name}</h2>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        <ul className="flex xl:flex-col flex-wrap gap-5 my-5">
          {layoutData.length > 0 &&
            layoutData.map((li) => (
              <Link
                key={li.id}
                href={`/${locale}/profile${li.link}`}
                className={`flex items-center rounded-lg transition-colors duration-150 gap-2 py-3 px-5 ${
                  isActive(li.link)
                    ? "bg-primary text-background"
                    : "bg-muted/30 hover:bg-primary hover:text-background"
                }`}
              >
                {iconMap[li.link]}
                <span className="text-xl">{li.name}</span>
              </Link>
            ))}
          <Button
            variant={"destructive"}
            className="text-md rounded-lg"
            onClick={logout}
          >
            <LogOut className="ltr:scale-x-[-1]" />
            {t("dashboard.logOutBtn")}
          </Button>
        </ul>
      </div>
      <div className="border border-ring/30 rounded-lg p-5 xl:col-span-9">
        {children}
      </div>
    </section>
  );
};

export default AccountLayount;
