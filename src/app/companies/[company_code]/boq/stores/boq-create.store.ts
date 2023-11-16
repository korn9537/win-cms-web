import { getRunningDocument } from "@/services/graphql/company.service";
import { MasterCostCodeModel, getMasterCostCodes } from "@/services/graphql/masters/costcode.service";
import {
  MasterItemModel,
  MasterItemUnitModel,
  getMasterItemUnits,
  getMasterItems
} from "@/services/graphql/masters/master-item.service";
import { DocumentFormatModel } from "@/services/graphql/models/document-format.model";
import { MasterModelSizeModel, MasterModelTypeModel } from "@/services/graphql/models/project.model";
import numeral from "numeral";
import { create } from "zustand";

type BoqItemBase = {
  id: string;
  name: string;
  number?: string;
  //
  parent_id: string | null;
  parents?: string[];
  //
  work_rate_total: number;
  unit_rate_total: number;
  //
  total: number;
};

export type BoqItemGroup = BoqItemBase & {
  type: "group";
  //
  // childs?: string[];
  group_childs?: string[];
  material_childs?: string[];
  //
};

export type BoqItemMaterial = BoqItemBase & {
  type: "material";
  //
  item_id: string;
  item_code: string;
  item_name: string;
  //
  cost_code: string;
  //
  quantity: number;
  //
  unit_id: string;
  unit_name: string;
  //
  unit_rate_by_owner: boolean;
  unit_rate: number;
  //
  work_rate_by_owner: boolean;
  work_rate: number;
};

export type BoqItem = BoqItemGroup | BoqItemMaterial;

interface IBoqCreateStore {
  // items: BoqItem[];
  rootKeys: string[];
  itemKeys: string[];
  itemByKey: Record<string, BoqItem>;

  addItem: (item: BoqItem) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, item: BoqItem) => void;

  loading: boolean;
  masterModelTypes: MasterModelTypeModel[];
  masterModelSizes: MasterModelSizeModel[];
  masterItems: MasterItemModel[];
  masterItemUnits: MasterItemUnitModel[];
  masterCostCodes: MasterCostCodeModel[];
  masterDocumentFormats: DocumentFormatModel[];

  getMasterData: (modelTypes: MasterModelTypeModel[], modelSizes: MasterModelSizeModel[]) => Promise<void>;
}

export const useBoqCreateStore = create<IBoqCreateStore>((set, get) => ({
  // items: [],
  rootKeys: [],
  itemKeys: [],
  itemByKey: {},

  addItem: (item: BoqItem) => {
    const current = get();
    const rootKeys = current.rootKeys;
    const itemByKey = current.itemByKey;
    const parent = item.parent_id ? (itemByKey[item.parent_id] as BoqItemGroup) : null;
    const parentNumber = parent?.number ? parent.number : "";

    if (item.type == "group") {
      if (parentNumber === "") {
        item.number = (rootKeys.length + 1).toString();
      } else {
        item.number = `${parentNumber}.${(parent?.group_childs?.length || 0) + 1}`;
      }
    }

    if (parent) {
      // //
      // if (parent.childs == null) {
      //   parent.childs = [];
      // }
      // parent.childs.push(item.id);
      //
      if (item.type == "group") {
        if (parent.group_childs == null) {
          parent.group_childs = [];
        }
        parent.group_childs.push(item.id);
      }
      //
      if (item.type == "material") {
        if (parent.material_childs == null) {
          parent.material_childs = [];
        }
        parent.material_childs.push(item.id);
      }

      item.parents = [...(parent.parents || []), parent.id];
    } else {
      item.parents = [];

      if (item.type == "group") {
        rootKeys.push(item.id);
      } else {
        return;
        // add ไม่ได้
      }
    }

    if (item.parents.length) {
      item.parents.forEach((parentId) => {
        const parent = itemByKey[parentId] as BoqItemGroup;
        //
        if (parent) {
          parent.unit_rate_total = numeral(parent.unit_rate_total).add(item.unit_rate_total).value() || 0;
          parent.work_rate_total = numeral(parent.work_rate_total).add(item.work_rate_total).value() || 0;
          parent.total = numeral(parent.total).add(item.total).value() || 0;
        }
      });
    }

    set((state) => ({
      rootKeys: [...rootKeys],
      itemKeys: [...state.itemKeys, item.id],
      itemByKey: {
        ...itemByKey,
        [item.id]: item
      }
    }));

    // if (item.parent_id == null) {
    //   rootKeys.push(item.id);
    // }
    // const parent = item.parent_id ? itemByKey[item.parent_id] : null;

    // if (parent) {
    //   parent.childs.push(item.id);
    //   if (item.type === "material") {
    //     parent.unit_rate_total += item.unit_rate_total;
    //     parent.work_rate_total += item.work_rate_total;
    //     parent.total += item.total;
    //   }
    // }

    // set((state) => ({
    //   rootKeys: [...rootKeys],
    //   itemKeys: [...state.itemKeys, item.id],
    //   itemByKey: {
    //     ...state.itemByKey,
    //     [item.id]: item,
    //     ...(parent ? { [parent.id]: parent } : {})
    //   }
    // }));
  },

  removeItem: (id: string) => {
    // const items = get().items;
    // //
    // const item = items.find((i) => i.id === id);
    // //
    // if (item?.parent_id) {
    //   const parent = items.find((i) => i.id === item.parent_id);
    //   //
    //   if (parent) {
    //     parent.childs = parent.childs.filter((i) => i !== id);
    //   }
    // }
    // set((state) => ({
    //   items: [...items.filter((i) => i.id !== id)]
    // }));
    // const itemKeys = get().itemKeys;
    // const itemByKey = get().itemByKey;
    // //
    // const item = itemByKey[id];
    // //
    // if (item?.parent_id) {
    //   const parent = itemByKey[item.parent_id];
    //   //
    //   if (parent) {
    //     parent.childs = parent.childs.filter((i) => i !== id);
    //   }
    //   itemByKey[item.parent_id] = parent;
    // }
    // set((state) => ({
    //   itemKeys: [...itemKeys.filter((i) => i !== id)],
    //   itemByKey: {
    //     ...itemByKey,
    //     ...(item?.parent_id ? { [item.parent_id]: itemByKey[item.parent_id] } : {})
    //   }
    // }));
  },

  updateItem: (id: string, item: BoqItem) => {
    // set((state) => ({
    //   items: state.items.map((prev) => (prev.id === id ? item : prev))
    // }));

    set((state) => ({
      itemByKey: {
        ...state.itemByKey,
        [id]: item
      }
    }));
  },

  loading: true,
  masterItems: [],
  masterItemUnits: [],
  masterCostCodes: [],
  masterModelTypes: [],
  masterModelSizes: [],
  masterDocumentFormats: [],

  getMasterData: async (modelTypes: MasterModelTypeModel[], modelSizes: MasterModelSizeModel[]) => {
    set((state) => ({
      loading: true
    }));

    const masterItems = await getMasterItems();
    const masterItemUnits = await getMasterItemUnits();
    const masterCostCodes = await getMasterCostCodes();
    const masterFormatGroup = await getRunningDocument("CON");

    set((state) => ({
      loading: false,
      masterItems,
      masterItemUnits,
      masterCostCodes,
      masterModelTypes: modelTypes,
      masterModelSizes: modelSizes,
      masterDocumentFormats: masterFormatGroup.formats || []
    }));
  }
}));
