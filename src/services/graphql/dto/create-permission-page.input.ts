export type CreatePermissionPageDTO = {
  code: string;
  name_th: string;
  name_en: string;
  parent_id: string | null;
};

export type UpdatePermissionPageDTO = CreatePermissionPageDTO & {
  // id: string;
};
