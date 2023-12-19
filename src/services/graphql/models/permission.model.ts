export type PermissionPageModel = {
  id: string;
  code: string;
  name_th: string;
  name_en: string;
  level: number;
  parent_id: string | null;
  type: string;
};

export type PermissionEntityModel = {
  id: string;
  code: string;
  name_th: string;
  name_en: string;
  page_id: string | null;
};

export type PermissionModel = {
  id: string;
  code: string;
  name_th: string;
  name_en: string;
  parent_id: string | null;
  default_value: boolean;
};
