"use client";
import { InputField } from "@/components/common/InputField";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useGetUserQuery } from "@/redux/api/authApi";
import {
  useApplyCouponInCartMutation,
  useGetAllProductsInCartQuery,
} from "@/redux/api/cartApi";
import {
  useCheckOutSessionPaymobQuery,
  useCheckOutSessionStripeQuery,
  useCreateCashOrderMutation,
} from "@/redux/api/orderApi";
import { TInputType } from "@/types/authTypes";
import {
  BillingFormDataSchema,
  billingSchema,
} from "@/validations/billing/billing.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDollarSign, Loader2, Store } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const t = useTranslations("Cart");
  const ch = useTranslations("Checkout");
  const locale = useLocale();
  const router = useRouter();

  const formData = ch.raw("formData") as Array<{
    id: keyof BillingFormDataSchema;
    name: string;
    label: string;
    placeholder: string;
    type: TInputType;
  }>;
  const newAddress = ch.raw("newAddress") as Array<{
    id: keyof BillingFormDataSchema;
    name: string;
    label: string;
    placeholder: string;
    type: Exclude<TInputType, "phone">;
  }>;

  const { data: cartData, isLoading: isCartLoading } =
    useGetAllProductsInCartQuery();
  const cart = cartData?.data.cartItems;
  const { data: userData, isLoading: isUserLoading } = useGetUserQuery();
  const user = userData?.data;
  const { data: orderData, isLoading: isOrderLoading } =
    useGetAllProductsInCartQuery();
  const order = orderData?.data;
  const [checkoutCartId, setCheckoutCartId] = useState<string | null>(null);
  const { data: stripeSession, isLoading: isStripeLoading } =
    useCheckOutSessionStripeQuery(checkoutCartId!, {
      skip: !checkoutCartId,
    });
  const { data: paymobSession, isLoading: isPaymobLoading } =
    useCheckOutSessionPaymobQuery(checkoutCartId!, {
      skip: !checkoutCartId,
    });
  const [createCashOrder] = useCreateCashOrderMutation();
  const [applyCoupon, { isLoading: isApplyCouponLoading }] =
    useApplyCouponInCartMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    control,
    setValue,
  } = useForm<BillingFormDataSchema>({
    resolver: zodResolver(billingSchema(ch)),
    mode: "onTouched",
    defaultValues: {
      phone: "",
      paymentMethod: "COD",
    },
  });

  // Prefill
  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
      setValue("phone", user.phone);

      const firstAddress = user.addresses?.[0];

      if (firstAddress) {
        setValue("country", firstAddress.country ?? "");
        setValue("city", firstAddress.city ?? "");
        setValue("postalCode", firstAddress.postalCode ?? "");
      }
    }
  }, [user, setValue]);

  useEffect(() => {
    if (stripeSession?.data) {
      window.location.href = stripeSession.data;
    }
  }, [stripeSession]);

  useEffect(() => {
    if (paymobSession?.data) {
      window.location.href = paymobSession.data;
    }
  }, [paymobSession]);

  const phoneValue = watch("phone");
  const paymentMethod = watch("paymentMethod");

  const onSubmit = async (data: BillingFormDataSchema) => {
    const cartId = cartData?.data.id;
    if (!cartId) return;

    if (data.paymentMethod === "stripe") {
      setCheckoutCartId(cartId);
      toast.success(ch("response.successOrder"));
    }

    if (data.paymentMethod === "paymob") {
      setCheckoutCartId(cartId);
      toast.success(ch("response.successOrder"));
    }

    if (data.paymentMethod === "COD") {
      try {
        const res = await createCashOrder({ cartId }).unwrap();
        console.log(res.data);
        toast.success(ch("response.successOrder"));
        router.push(`/${locale}/invoice/${res.data?.id}`);
      } catch (err) {
        console.log(err);
        toast.success(ch("response.errorOrder"));
      }
    }
  };

  const handleApplyCoupon = async () => {
    const couponCode = watch("coupon");

    if (!couponCode) {
      toast.error(t("response.errorCoupon"));
      return;
    }

    try {
      await applyCoupon({ code: couponCode }).unwrap();
      toast.success(t("response.successCoupon"));
    } catch (err) {
      toast.error(t("response.errorCoupon"));
    }
  };

  if (
    isCartLoading ||
    isUserLoading ||
    isOrderLoading ||
    isStripeLoading ||
    isPaymobLoading
  )
    return (
      <div className="flex flex-col items-center gap-5 my-50  ">
        <Loader2 className="w-30 h-30 animate-spin text-primary" />
        <p>{ch("loading")}</p>
      </div>
    );

  return (
    <form
      className="mt-40 container mx-auto px-5 md:px-30"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-4xl font-semibold capitalize mb-5">{ch("title")}</h1>

      {cart ? (
        <div className="flex flex-col md:flex-row items-start gap-5">
          <div className="space-y-5 w-full">
            <div className="border border-ring/30 rounded-lg p-5 space-y-5">
              {formData.map((field) => (
                <div key={field.id} className="w-full">
                  {field.type === "phone" ? (
                    <InputField
                      type="phone"
                      label={field.label}
                      placeholder={field.placeholder}
                      phoneValue={phoneValue}
                      onPhoneChange={(value) =>
                        setValue("phone", value, { shouldValidate: true })
                      }
                      errors={errors}
                      isSubmitting={isSubmitting}
                    />
                  ) : (
                    <InputField
                      type={field.type}
                      name={field.id}
                      label={field.label}
                      placeholder={field.placeholder}
                      register={register(field.id)}
                      errors={errors}
                      control={control}
                      isSubmitting={isSubmitting}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="border border-ring/30 rounded-lg p-5">
              <Accordion defaultValue={[""]} type="multiple" className="px-1">
                <AccordionItem value="newAddress">
                  <AccordionTrigger className="text-2xl cursor-pointer">
                    {ch("newAddressTitle")}
                  </AccordionTrigger>
                  <AccordionContent className="space-y-5">
                    {newAddress.map((field) => (
                      <InputField
                        key={field.id}
                        type={field.type}
                        name={field.id}
                        label={field.label}
                        placeholder={field.placeholder}
                        register={register(field.id)}
                        errors={errors}
                        control={control}
                        isSubmitting={isSubmitting}
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          <div className="space-y-5 w-full">
            <div className="border border-ring/30 rounded-lg p-5">
              <h4 className="text-lg font-semibold pb-5 border-b border-ring/30">
                {t("coupon.title")}
              </h4>

              <div>
                <div className="flex items-center justify-between border-b border-ring/30 py-5">
                  <p className="text-lg font-bold">
                    {t("orderSummary.product")}
                  </p>
                  <p className="text-md font-bold">
                    {t("orderSummary.subtotal")}
                  </p>
                </div>
                {cart?.map((cart) => (
                  <div
                    key={cart.id}
                    className="flex items-center justify-between border-b border-ring/30 py-5"
                  >
                    <p className="text-lg font-semibold text-muted-foreground">
                      {cart.product.title}
                    </p>
                    <p className="text-md font-semibold text-muted-foreground">
                      ${cart.product.priceAfterDiscount} ({cart.quantity})
                    </p>
                  </div>
                ))}
                <div className="flex items-center justify-between py-5">
                  <p className="text-lg font-bold">{t("orderSummary.total")}</p>
                  <p className="text-lg font-bold">
                    ${cartData?.data.totalPrice}
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-ring/30 rounded-lg p-5 h-fit">
              <h4 className="text-lg font-semibold pb-5 border-b border-ring/30">
                {t("coupon.title")}
              </h4>
              <div className="flex items-center flex-col md:flex-row gap-5 mt-5">
                <div className="flex flex-col w-full">
                  <Input
                    {...register("coupon")}
                    placeholder={t("coupon.placeholder")}
                    type={"text"}
                    className="py-5.5 px-5 rounded-full bg-background"
                  />
                  {errors && (
                    <p className="text-destructive text-sm mt-1">
                      {errors?.coupon?.message as string}
                    </p>
                  )}
                </div>

                <Button
                  className="w-full md:w-fit"
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={isSubmitting}
                >
                  {isApplyCouponLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>{t("coupon.applyBtn")}</>
                  )}
                </Button>
              </div>
            </div>

            <div className="border border-ring/30 rounded-lg p-5">
              <h4 className="text-2xl font-semibold border-b border-ring/30 pb-3">
                {ch("shippingMethod")}
              </h4>

              <RadioGroup
                defaultValue="shipping"
                className="w-fit pt-5"
                dir={locale === "en" ? "ltr" : "rtl"}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem
                    value="shipping"
                    id="free"
                    className="cursor-pointer"
                  />
                  <Label htmlFor="free" className="text-lg cursor-pointer">
                    {ch("freeShipping")}
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="border border-ring/30 rounded-lg p-5">
              <h4 className="text-2xl font-semibold border-b border-ring/30 pb-3">
                {ch("paymentMethodTitle")}
              </h4>

              <RadioGroup
                value={paymentMethod}
                onValueChange={(value) =>
                  setValue("paymentMethod", value as any)
                }
                defaultValue="COD"
                className="w-fit pt-5"
                dir={locale === "en" ? "ltr" : "rtl"}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem
                    value="COD"
                    id="COD"
                    className="cursor-pointer"
                  />
                  <Label
                    htmlFor="COD"
                    className="text-lg cursor-pointer flex items-center gap-3 bg-muted p-3 rounded-md border border-muted hover:border-primary transition-colors"
                  >
                    <CircleDollarSign size={25} />
                    <span>|</span>
                    <span>{ch("COD")}</span>
                  </Label>
                </div>

                <div className="flex items-center gap-3">
                  <RadioGroupItem
                    value="stripe"
                    id="stripe"
                    className="cursor-pointer"
                  />
                  <Label
                    htmlFor="stripe"
                    className="text-lg cursor-pointer flex items-center gap-3 bg-muted p-3 rounded-md border border-muted hover:border-primary transition-colors"
                  >
                    <Image
                      src={"/images/products/stripe.svg"}
                      width={70}
                      height={70}
                      alt="stripe-payment-method"
                      loading="lazy"
                    />
                    <span>|</span>
                    <span>{ch("stripe")}</span>
                  </Label>
                </div>

                <div className="flex items-center gap-3">
                  <RadioGroupItem
                    value="paymob"
                    id="paymob"
                    className="cursor-pointer"
                  />
                  <Label
                    htmlFor="paymob"
                    className="text-lg cursor-pointer flex items-center gap-3 bg-muted p-3 rounded-md border border-muted hover:border-primary transition-colors"
                  >
                    <Image
                      src={"/images/products/paymob.png"}
                      width={70}
                      height={70}
                      alt="paymob-payment-method"
                      loading="lazy"
                    />
                    <span>|</span>
                    <span>{ch("paymob")}</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              type="submit"
              disabled={isOrderLoading || isStripeLoading || isPaymobLoading}
            >
              {isOrderLoading || isStripeLoading || isPaymobLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {ch("payBtn")}{" "}
                  <span className="font-semibold">${order?.totalPrice}</span>
                </>
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 items-center my-25">
          <Store size={100} color="var(--primary)" />
          <h3 className="text-xl font-semibold">{t("emptyTitle")}</h3>
          <Button asChild className="md:w-100">
            <Link href={`/${locale}/`}>{t("continueShopping")}</Link>
          </Button>
        </div>
      )}
    </form>
  );
};

export default CheckoutPage;
