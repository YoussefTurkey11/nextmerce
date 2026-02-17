"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { RootState } from "@/redux/store";
import { closeAuthDialog } from "@/redux/slices/uiSlice";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

export default function AuthDialog() {
  const t = useTranslations("Auth");
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(
    (state: RootState) => state.ui.isAuthDialogOpen,
  );

  return (
    <Dialog open={isOpen} onOpenChange={() => dispatch(closeAuthDialog())}>
      <DialogContent>
        <DialogHeader className="flex flex-col items-center justify-center gap-10">
          <DialogTitle className="text-xl md:text-3xl font-semibold">
            {t("AuthDialog.title")}
          </DialogTitle>
          <Image
            src={"/images/products/shoppings.png"}
            width={200}
            height={200}
            alt="shopping"
            loading="eager"
          />
        </DialogHeader>

        <div className="flex gap-4 mt-4">
          <Link
            href={`/${locale}/login`}
            className="w-full"
            onClick={() => dispatch(closeAuthDialog())}
          >
            <Button className="w-full">{t("AuthDialog.loginBtn")}</Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
