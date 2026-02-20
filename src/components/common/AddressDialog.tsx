import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addressSchema,
  AddressDataSchema,
} from "@/validations/address/address.schema";
import { useTranslations } from "next-intl";
import { TInputType } from "@/types/authTypes";
import { InputField } from "./InputField";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreate: (data: AddressDataSchema) => void;
  isCreating: boolean;
};

const AddressDialog = ({ open, setOpen, handleCreate, isCreating }: Props) => {
  const t = useTranslations("Profile");
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddressDataSchema>({
    resolver: zodResolver(addressSchema(t)),
    mode: "onChange",
    defaultValues: {
      alias: "",
      details: "",
      phone: "",
      country: "",
      city: "",
      postalCode: "",
    },
  });
  const addressFormData = t.raw("address.formData") as Array<{
    id: keyof AddressDataSchema;
    label: string;
    placeholder: string;
    type: TInputType;
  }>;

  const onSubmit = async (data: AddressDataSchema) => {
    await handleCreate(data);
    reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="md:min-w-200!">
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {addressFormData.map((field) =>
              field.type === "phone" ? (
                <Controller
                  key={field.id}
                  name={field.id}
                  control={control}
                  render={({ field: controllerField }) => (
                    <InputField
                      name={field.id}
                      label={field.label}
                      placeholder={field.placeholder}
                      type="phone"
                      errors={errors}
                      phoneValue={controllerField.value}
                      onPhoneChange={controllerField.onChange}
                    />
                  )}
                />
              ) : (
                <InputField
                  key={field.id}
                  name={field.id}
                  label={field.label}
                  placeholder={field.placeholder}
                  type={field.type}
                  register={register(field.id)}
                  errors={errors}
                />
              ),
            )}
          </div>

          <Button type="submit" className="w-full mt-7" disabled={isCreating}>
            {isCreating ? "Saving..." : "Save Address"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddressDialog;
