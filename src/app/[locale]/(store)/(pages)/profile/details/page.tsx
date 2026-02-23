"use client";

import { InputField } from "@/components/common/InputField";
import { SkeletonCard } from "@/components/common/SkeletonCard";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  useGetUserQuery,
  useUpdateUserDataMutation,
} from "@/redux/api/authApi";
import { setUser } from "@/redux/slices/authSlice";
import { useAppDispatch } from "@/redux/store";
import { TInputType } from "@/types/authTypes";
import {
  DetailsFormDataSchema,
  detailsSchema,
} from "@/validations/details/details.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenLine } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Details = () => {
  const t = useTranslations("Profile");
  const locale = useLocale();

  const profileFormData = (
    t.raw("profile.formData") as Array<{
      id: keyof DetailsFormDataSchema;
      label: string;
      placeholder: string;
      type: TInputType;
    }>
  ).filter((field) => field.id !== "profileImage");

  const dispatch = useAppDispatch();
  const [isUploading, setIsUploading] = useState(false);
  const [updateUser] = useUpdateUserDataMutation();
  const { data: userData, isLoading } = useGetUserQuery();
  const user = userData?.data;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    control,
    setValue,
  } = useForm<DetailsFormDataSchema>({
    resolver: zodResolver(detailsSchema(t)),
    mode: "onChange",
  });

  // Prefill
  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("phone", user.phone);
    }
  }, [user, setValue]);

  const profileImage = watch("profileImage");
  const phoneValue = watch("phone");

  // Image Preview
  const imagePreview = useMemo(() => {
    if (profileImage?.[0]) {
      return URL.createObjectURL(profileImage[0]);
    }
    return user?.profileImage || "/images/products/user.png";
  }, [profileImage, user]);

  // Submit
  const onSubmit = async (data: DetailsFormDataSchema) => {
    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("phone", data.phone);

      if (data.profileImage?.[0]) {
        formData.append("profileImage", data.profileImage[0]);
      }

      const res = await updateUser(formData).unwrap();

      dispatch(setUser(res.data));
      toast.success(t("profile.response.success"));
    } catch (error: any) {
      toast.error(error?.data?.message || t("profile.response.error"));
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    );
  }

  return (
    <section className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <Avatar className="w-28 h-28">
              <Image
                src={imagePreview}
                width={112}
                height={112}
                alt={user?.name || "user"}
                className="object-cover rounded-full"
              />
            </Avatar>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              id="profileImage"
              {...register("profileImage")}
              onClick={(e) => ((e.target as HTMLInputElement).value = "")}
            />

            <label
              htmlFor="profileImage"
              className="p-2 rounded-full bg-primary text-background border-2 border-background cursor-pointer absolute bottom-0 right-0"
            >
              <PenLine size={16} />
            </label>
          </div>

          <p className="py-3 px-6 rounded-md bg-muted-foreground/5 text-muted-foreground font-semibold">
            {user?.email}
          </p>
        </div>

        {/* Inputs */}
        {profileFormData.map((field) => (
          <div key={field.id}>
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
                isSubmitting={isSubmitting || isUploading}
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
                isSubmitting={isSubmitting || isUploading}
              />
            )}
          </div>
        ))}

        <Button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="w-full"
        >
          {isSubmitting || isUploading
            ? locale === "en"
              ? "Updating..."
              : "جاري التعديل..."
            : locale === "en"
              ? "Update"
              : "تعديل"}
        </Button>
      </form>
    </section>
  );
};

export default Details;
