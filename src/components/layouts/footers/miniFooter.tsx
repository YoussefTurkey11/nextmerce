"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";

const MiniFooter = () => {
  const t = useTranslations("Footer");
  return (
    <section className="p-5 bg-muted">
      <div className="flex flex-col md:flex-row gap-5 items-center justify-between container mx-auto px-5 md:px-30">
        <h3 className="text-foreground/80">{t("copyRights")}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 md:gap-0 items-center">
          <p className="text-foreground/80 px-1">{t("accept")}:</p>
          <Image
            src={"/images/products/payment-01.svg"}
            width={40}
            height={40}
            alt="master-cart"
            loading="lazy"
          />
          <Image
            src={"/images/products/payment-02.svg"}
            width={40}
            height={40}
            alt="visa"
            loading="lazy"
          />
          <Image
            src={"/images/products/payment-03.svg"}
            width={40}
            height={40}
            alt="paypal"
            loading="lazy"
          />
          <Image
            src={"/images/products/payment-04.svg"}
            width={40}
            height={40}
            alt="american-express"
            loading="lazy"
          />
          <Image
            src={"/images/products/payment-05.svg"}
            width={40}
            height={40}
            alt="western-union"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default MiniFooter;
