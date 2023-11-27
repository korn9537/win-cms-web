export type CreateProjectBoqDTO = {
  running_format_id: string;
  name: string;
  project_id: string | null;
  model_type_id: string | null;
  model_id: string | null;
  area_size_id: string | null;
  total_area: number; // input
  total_cost: number; // เอามาจาก item มาบวกกัน
  average_price: number; // total_cost / total_area
  ref_master_boq_id: string | null; // ref มาจาก master_boq, master มี revision
  items: CreateProjectBoqItemDTO[];
  state: string;
};

export type CreateProjectBoqItemDTO = {
  id: string;
  type: string; // group, material
  name: string | null;
  number: string | null;
  // ---------------
  item_id: string | null;
  item_code: string | null;
  // ---------------
  unit_rate: number;
  unit_rate_by_owner: boolean;
  unit_rate_total: number;
  owner_unit_total: number;
  // ---------------
  work_rate: number;
  work_rate_by_owner: boolean;
  work_rate_total: number;
  owner_unit_work_total: number;
  owner_work_total: number;
  // ---------------
  cost_code: string | null;
  quantity: number | null;
  total: number;
  level: number;
  // ---------------
  parents: string[];
  parent_id: string | null;
  childs: string[];
};
