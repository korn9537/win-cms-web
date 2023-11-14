import { CreateAddressDTO } from "./create-address.input";

export type CreateCompanyDTO = {
  code: string;

  name_th: string;

  name_en: string;

  tax_number: string;

  email: string;

  telephone: string;

  website?: string;

  logo_image_id?: string | null;

  corporate_crest_id?: string | null;

  register_vat: boolean;

  is_active: boolean;

  interface_code?: string;

  change_amount?: number;

  // ---------------- CMS
  payment_term_code: string;

  // ---------------- RELATIONS
  address: CreateAddressDTO;
};
