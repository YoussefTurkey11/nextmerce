"use client";
import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  const locale = useLocale();
  return (
    <Link href={`/${locale}`}>
      <Image
        src={"/logo.svg"}
        width={150}
        height={150}
        alt="nextmerce-logo"
        loading="eager"
      />
    </Link>
  );
};

export default Logo;
