"use client";
import { Button } from "@/components/ui/button";
import { Mail, MapPinned, Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const t = useTranslations("Footer");
  const locale = useLocale();
  return (
    <footer className="container mx-auto px-5 md:px-30 py-5">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 border-t border-ring/30 pt-10">
        {/* help & Support */}
        <div className="flex flex-col gap-5">
          <h5 className="text-2xl font-semibold capitalize">
            {t("help.title")}
          </h5>
          <ul className="flex flex-col gap-5">
            <li className="flex items-center gap-4">
              <span className="text-primary">
                <MapPinned size={20} />
              </span>
              <span>{t("help.location")}</span>
            </li>
            <li className="flex items-center gap-4">
              <span className="text-primary">
                <Phone size={20} />
              </span>
              <Link href={`tel:${t("help.location")}`} dir="ltr">
                {t("help.phone")}
              </Link>
            </li>
            <li className="flex items-center gap-4">
              <span className="text-primary">
                <Mail size={20} />
              </span>
              <Link href={`mailto:${t("help.email")}`}>{t("help.email")}</Link>
            </li>
          </ul>
          <div className="flex items-center gap-5">
            <Link href={"/"} className="hover:text-primary">
              <FaFacebook size={20} />
            </Link>
            <Link href={"/"} className="hover:text-primary">
              <FaXTwitter size={20} />
            </Link>
            <Link href={"/"} className="hover:text-primary">
              <FaInstagram size={20} />
            </Link>
            <Link href={"/"} className="hover:text-primary">
              <FaLinkedin size={20} />
            </Link>
          </div>
        </div>

        {/* Account */}
        <div className="flex flex-col gap-5">
          <h5 className="text-2xl font-semibold capitalize">
            {t("account.title")}
          </h5>
          <ul className="flex flex-col gap-5">
            <li className="flex items-center gap-4 group">
              <Link
                href={`/${locale}/login`}
                className="group-hover:text-primary"
              >
                {t("account.login")}
              </Link>
            </li>
            <li className="flex items-center gap-4 group">
              <Link
                href={`/${locale}/cart`}
                className="group-hover:text-primary"
              >
                {t("account.cart")}
              </Link>
            </li>
            <li className="flex items-center gap-4 group">
              <Link
                href={`/${locale}/wishlist`}
                className="group-hover:text-primary"
              >
                {t("account.wishlist")}
              </Link>
            </li>
            <li className="flex items-center gap-4 group">
              <Link
                href={`/${locale}/shop`}
                className="group-hover:text-primary"
              >
                {t("account.shop")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Link */}
        <div className="flex flex-col gap-5">
          <h5 className="text-2xl font-semibold capitalize">
            {t("quickLink.title")}
          </h5>
          <ul className="flex flex-col gap-5">
            <li className="flex items-center gap-4 group">
              <Link
                href={`/${locale}/privacyPolicy`}
                className="group-hover:text-primary"
              >
                {t("quickLink.privacy")}
              </Link>
            </li>
            <li className="flex items-center gap-4 group">
              <Link
                href={`/${locale}/refundPolicy`}
                className="group-hover:text-primary"
              >
                {t("quickLink.refund")}
              </Link>
            </li>
            <li className="flex items-center gap-4 group">
              <Link
                href={`/${locale}/terms`}
                className="group-hover:text-primary"
              >
                {t("quickLink.terms")}
              </Link>
            </li>
            <li className="flex items-center gap-4 group">
              <Link
                href={`/${locale}/FAQs`}
                className="group-hover:text-primary"
              >
                {t("quickLink.faq")}
              </Link>
            </li>
            <li className="flex items-center gap-4 group">
              <Link
                href={`/${locale}/contact`}
                className="group-hover:text-primary"
              >
                {t("quickLink.contact")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Download App */}
        <div className="flex flex-col items-end gap-5">
          <h5 className="text-2xl font-semibold capitalize">
            {t("downloadApp.title")}
          </h5>
          <p>{t("downloadApp.desc")}</p>
          <div className="flex flex-col gap-3">
            <Button className="w-45 rounded-lg py-7! bg-foreground">
              <Image
                src={"/images/products/apple.svg"}
                width={35}
                height={35}
                alt="apple"
                loading="lazy"
              />
              <div className="flex flex-col items-start">
                <p>{t("downloadApp.apple.head")}</p>
                <h6 className="text-lg font-semibold">
                  {t("downloadApp.apple.body")}
                </h6>
              </div>
            </Button>

            <Button className="w-45 rounded-lg py-7!">
              <Image
                src={"/images/products/googlePlay.svg"}
                width={35}
                height={35}
                alt="apple"
                loading="lazy"
              />
              <div className="flex flex-col items-start">
                <p>{t("downloadApp.google.head")}</p>
                <h6 className="text-lg font-semibold">
                  {t("downloadApp.google.body")}
                </h6>
              </div>
            </Button>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
