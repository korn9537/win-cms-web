export type ProjectModel = {
  id: string;
  code: string;
  acronym: string;
  name_th: string;
  type: string;
  image_url: string;
  status: string;
  is_active: boolean;
  company_id: string;
};

export type ProjectInfoModel = ProjectModel & {
  model_sizes?: MasterModelSizeModel[];
  model_types?: MasterModelTypeModel[];
};

export type MasterModelTypeModel = {
  id: string;
  code: string;
  name_th: string;
  models?: MasterModelModel[];
};

export type MasterModelModel = {
  id: string;
  code: string;
  name_th: string;
};

export type MasterModelSizeModel = {
  id: string;
  code: string;
  name_th: string;
};
