export type CreateRoleDTO = {
  code: string;
  name_th: string;
  name_en: string;
};

export type UpdateRoleDTO = CreateRoleDTO & {
  // id: string;
};
