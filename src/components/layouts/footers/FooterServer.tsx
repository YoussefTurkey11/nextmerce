import Image from "next/image";
import Footer from "./Footer";

const FooterServer = () => {
  return (
    <>
      <Footer />
      <section className="p-5 bg-muted">
        <div className="flex flex-col md:flex-row gap-5 items-center justify-between container mx-auto px-5 md:px-30">
          <h3 className="text-foreground/80">
            © 2026. All rights reserved by SwanTeam.
          </h3>
          <div className="flex items-center gap-5">
            <p className="text-foreground/80">We Accept:</p>
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
    </>
  );
};

export default FooterServer;
