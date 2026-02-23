"use client";
import { InputField } from "@/components/common/InputField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetAllProductsInCartQuery } from "@/redux/api/cartApi";
import { TInputType } from "@/types/authTypes";
import {
  BillingFormDataSchema,
  billingSchema,
} from "@/validations/billing/billing.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

const CheckoutPage = () => {
  const t = useTranslations("Cart");
  const ch = useTranslations("Checkout");
  const formData = ch.raw("formData") as Array<{
    id: keyof BillingFormDataSchema;
    name: string;
    label: string;
    placeholder: string;
    type: TInputType;
  }>;
  const { data: cartData } = useGetAllProductsInCartQuery();
  const cart = cartData?.data.cartItems;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    control,
    setValue,
  } = useForm<BillingFormDataSchema>({
    resolver: zodResolver(billingSchema(t)),
    mode: "onChange",
    defaultValues: {
      phone: "",
    },
  });

  const phoneValue = watch("phone");

  return (
    <section className="mt-40 container mx-auto px-5 md:px-30">
      <div className="flex items-start gap-5">
        <div className="space-y-5 w-full">
          <h1 className="text-4xl font-semibold capitalize">{ch("title")}</h1>

          <div className="border border-ring/30 rounded-lg p-5">
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
        </div>

        <div className="space-y-5 w-full">
          <div className="border border-ring/30 rounded-lg p-5">
            <h4 className="text-lg font-semibold pb-5 border-b border-ring/30">
              {t("coupon.title")}
            </h4>

            <div>
              <div className="flex items-center justify-between border-b border-ring/30 py-5">
                <p className="text-lg font-bold">{t("orderSummary.product")}</p>
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
                    ${cart.product.priceAfterDiscount}
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

          <form className="border border-ring/30 rounded-lg p-5 h-fit">
            <h4 className="text-lg font-semibold pb-5 border-b border-ring/30">
              {t("coupon.title")}
            </h4>
            <div className="flex items-center gap-5 mt-5">
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

              <Button className="w-fit" type="submit" disabled={isSubmitting}>
                {t("coupon.applyBtn")}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
