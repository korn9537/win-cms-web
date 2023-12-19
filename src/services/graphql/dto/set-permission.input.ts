export type SetPermissionDTO = {
  ref_id: string;
  ref_type: string;
  page_id: string;
  entity_codes: string[];
};

export type DeletePermissionDTO = SetPermissionDTO & {};
