export type CreateAddressDTO = {
  country: string;

  // line_1: string;

  // line_2: string;

  address_th: string;

  village_th?: string;

  moo_th?: string;

  tower_th?: string;

  floor_th?: string;

  soi_th?: string;

  road_th?: string;

  //----------------

  address_en?: string;

  village_en?: string;

  moo_en?: string;

  tower_en?: string;

  floor_en?: string;

  soi_en?: string;

  road_en?: string;

  //----------------

  sub_district_id: string;

  district_id: string;

  province_id: string;

  zip_code: number;

  latitude?: number;

  longitude?: number;

  address_type?: string;

  is_default?: boolean;

  contact_name?: string;

  contact_mobile?: string;

  contact_type?: string;

  google_map_url?: string;
};
