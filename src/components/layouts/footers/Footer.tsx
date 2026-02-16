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
      <section className="flex flex-col lg:flex-row items-center justify-between gap-5 rounded-lg p-10 bg-[url('/images/products/newsletter-bg.webp')] bg-cover bg-center">
        <div>
          <h4 className="text-xl md:text-4xl font-bold text-background xl:w-110">
            {t("footerBanner.title")}
          </h4>
          <p className="text-background">{t("footerBanner.subTitle")}</p>
        </div>
        <form className="flex items-center justify-center lg:justify-end gap-3 w-full">
          <input
            type="email"
            placeholder={t("footerBanner.placeholder")}
            className="py-3 px-5 rounded-full bg-background xl:w-100"
            required
          />
          <Button variant={"secondary"} className="w-fit">
            {t("footerBanner.btn")}
          </Button>
        </form>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-20 border-t border-ring/30 pt-10">
        {/* help & Support */}
        <div className="flex flex-col gap-5">
          <h5 className="text-2xl font-semibold capitalize">Help & Support</h5>
          <ul className="flex flex-col gap-5">
            <li className="flex items-center gap-4">
              <span className="text-primary">
                <MapPinned size={20} />
              </span>
              <span>685 Market Street,Las Vegas, LA 95820,United States.</span>
            </li>
            <li className="flex items-center gap-4">
              <span className="text-primary">
                <Phone size={20} />
              </span>
              <Link href={"tel:(+099) 532-786-9843"}>(+099) 532-786-9843</Link>
            </li>
            <li className="flex items-center gap-4">
              <span className="text-primary">
                <Mail size={20} />
              </span>
              <Link href={"mailto:support@example.com"}>
                support@example.com
              </Link>
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
          <h5 className="text-2xl font-semibold capitalize">Account</h5>
          <ul className="flex flex-col gap-5">
            <li className="flex items-center gap-4 group">
              <Link
                href={`/${locale}/login`}
                className="group-hover:text-primary"
              >
                Login / Register
              </Link>
            </li>
            <li className="flex items-center gap-4 group">
              <Link
                href={`/${locale}/cart`}
                className="group-hover:text-primary"
              >
                Cart
              </Link>
            </li>
            <li className="flex items-center gap-4 group">
              <Link
                href={`/${locale}/wishlist`}
                className="group-hover:text-primary"
              >
                Wishlist
              </Link>
            </li>
            <li className="flex items-center gap-4 group">
              <Link
                href={`/${locale}/shop`}
                className="group-hover:text-primary"
              >
                Shop
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Link */}
        <div className="flex flex-col gap-5">
          <h5 className="text-2xl font-semibold capitalize">Quick Link</h5>
          <ul className="flex flex-col gap-5">
            <li className="flex items-center gap-4 group">
              <Link
                href={`/${locale}/privacyPolicy`}
                className="group-hover:text-primary"
              >
                Privacy Policy
              </Link>
            </li>
            <li className="flex items-center gap-4 group">
              <Link
                href={`/${locale}/refundPolicy`}
                className="group-hover:text-primary"
              >
                Refund Policy
              </Link>
            </li>
            <li className="flex items-center gap-4 group">
              <Link
                href={`/${locale}/terms`}
                className="group-hover:text-primary"
              >
                Terms of Use
              </Link>
            </li>
            <li className="flex items-center gap-4 group">
              <Link
                href={`/${locale}/FAQs`}
                className="group-hover:text-primary"
              >
                FAQ's
              </Link>
            </li>
            <li className="flex items-center gap-4 group">
              <Link
                href={`/${locale}/contact`}
                className="group-hover:text-primary"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Download App */}
        <div className="flex flex-col items-end gap-5">
          <h5 className="text-2xl font-semibold capitalize">Download App</h5>
          <p>Save $3 With App & New User only</p>
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
                <p>Download on the</p>
                <h6 className="text-lg font-semibold">App Store</h6>
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
                <p>Get in On</p>
                <h6 className="text-lg font-semibold">Google Play</h6>
              </div>
            </Button>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
