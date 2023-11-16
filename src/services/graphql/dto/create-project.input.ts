import { CreateAddressDTO } from "./create-address.input";

export type CreateProjectDTO = {
  image_id?: string | null;
  code: string;
  acronym?: string;
  name_th: string;
  name_en?: string;
  type: string;
  company_id: string;
  brand_id: string;
  opening_at: string;
  closing_at?: string;
  value: number;
  title_deed_number: string;
  land_number: string;
  partition_number: string;
  survey_number: string;
  land_book: string;
  book_number: string;
  land_area_rai: number;
  land_area_ngan: number;
  land_area_wa: number;
  address: CreateAddressDTO;
};
