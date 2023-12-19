export type CreatePermissionEntityDTO = {
  code: string;
  name_th: string;
  name_en: string;
  page_id: string | null;
};

export type UpdatePermissionEntityDTO = CreatePermissionEntityDTO & {
  // id: string;
};
