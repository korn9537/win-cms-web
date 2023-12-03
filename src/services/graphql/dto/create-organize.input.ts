export type CreateOrganizeDTO = {
  code: string;
  name_th: string;
  name_en: string;
  parent_id: string | null;
};

export type UpdateUserDTO = CreateOrganizeDTO & {
  // id: string;
};
