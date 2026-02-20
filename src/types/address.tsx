export type TAddressResponse = {
  result: number;
  message: string;
  data: TAddress[];
};

export type TAddress = {
  id: string;
  alias: string;
  details: string;
  phone: string;
  country: string;
  postalCode: string;
  city: string;
  _id?: string;
};

export type TCreateAddressBody = {
  alias: string;
  details: string;
  phone: string;
  country: string;
  postalCode: string;
  city: string;
};

export type TCreateAddressResponse = {
  message: string;
  data: TAddress[];
};

export type TDeleteAddressResponse = {
  message: string;
};
