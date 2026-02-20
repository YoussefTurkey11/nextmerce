"use client";

import AddressDialog from "@/components/common/AddressDialog";
import { SkeletonCard } from "@/components/common/SkeletonCard";
import { Button } from "@/components/ui/button";
import {
  useCreateAddressesMutation,
  useDeleteAddressesMutation,
  useGetAllAddressesQuery,
} from "@/redux/api/addressApi";
import { AddressDataSchema } from "@/validations/address/address.schema";
import {
  Building2,
  FolderKanban,
  Headset,
  Info,
  Loader2,
  Phone,
  Trash2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";

const Addresses = () => {
  const t = useTranslations("Profile");
  const { data: addressesData, isLoading } = useGetAllAddressesQuery();
  const [createAddress, { isLoading: isCreating }] =
    useCreateAddressesMutation();
  const [deleteAddress] = useDeleteAddressesMutation();
  const [open, setOpen] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const address = addressesData?.data;

  const handleCreate = async (data: AddressDataSchema) => {
    try {
      await createAddress(data).unwrap();
      setOpen(false);
      toast.success(t("address.addBtn.successAdd"));
    } catch {
      toast.error(t("address.addBtn.failedAdd"));
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteAddress(id).unwrap();
      toast.success(t("address.deleteBtn.successDelete"));
    } catch (err) {
      toast.error(t("address.deleteBtn.failedDelete"));
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center gap-5">
        {Array.from({ length: 4 }).map((_, idx) => (
          <SkeletonCard key={idx} />
        ))}
      </div>
    );

  return (
    <section>
      <div className="border-b border-ring/30 pb-5 flex flex-col md:flex-row justify-between items-center gap-5">
        <h3 className="text-2xl font-semibold">{t("address.title")}</h3>
        <Button
          className="md:w-fit"
          onClick={() => setOpen(true)}
          disabled={isCreating}
        >
          {isCreating ? t("address.addBtn.loading") : t("address.addBtn.add")}
        </Button>
      </div>

      {address?.map((address) => (
        <div
          key={address.id}
          className="flex items-start justify-between py-5 border-b border-ring/30"
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <FolderKanban size={20} />
              <span>
                {t("address.formTitles.alias")}:{" "}
                <strong>{address.alias}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 size={20} />
              <span>
                {t("address.formTitles.place")}:{" "}
                <strong>
                  {address.city}, {address.country}
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Info size={20} />
              <span>
                {t("address.formTitles.details")}:{" "}
                <strong>{address.details}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={20} />
              <span>
                {t("address.formTitles.phone")}:{" "}
                <strong>{address.phone}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Headset size={20} />
              <span>
                {t("address.formTitles.postalCode")}:{" "}
                <strong>{address.postalCode}</strong>
              </span>
            </div>
          </div>

          <Button
            variant="delete"
            className="w-fit"
            onClick={() => handleDelete(address.id)}
            disabled={deletingId === address.id}
          >
            {deletingId === address.id ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Trash2 />
            )}
          </Button>
        </div>
      ))}

      <AddressDialog
        open={open}
        setOpen={setOpen}
        handleCreate={handleCreate}
        isCreating={isCreating}
      />
    </section>
  );
};

export default Addresses;
