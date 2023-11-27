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
import { FormInfoValues, defaultFormInfoValues } from "../components/forms/FormInfo";

type BoqItemBase = {
  id: string;
  name: string;
  number: string;
  //
  parents: string[];
  //
  work_rate_total: number;
  unit_rate_total: number;
  //
  total: number;
  //
  owner_unit_total?: number;
  owner_unit_work_total?: number;
  owner_work_total?: number;
};

export type BoqItemGroup = BoqItemBase & {
  type: "group";
  //
  parent_id: string | null;
  //
  group_childs: string[];
  material_childs: string[];
  childs: string[];
  //
  level: number;
};

export type BoqItemMaterial = BoqItemBase & {
  type: "material";
  //
  parent_id: string;
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

// const defaultValues: {
//   rootKeys: string[];
//   itemKeys: string[];
//   itemByKey: Record<string, BoqItem>;
// } = {
//   rootKeys: ["boq-item-1", "boq-item-2", "boq-item-3"],
//   itemKeys: [
//     "boq-item-1",
//     "boq-item-2",
//     "boq-item-3",
//     "boq-item-4",
//     "boq-item-5",
//     "boq-item-6",
//     "boq-item-7",
//     "boq-item-8",
//     "boq-item-9",
//     "boq-item-10",
//     "boq-item-11",
//     "boq-item-12",
//     "boq-item-13"
//   ]
// };

interface IBoqCreateStore {
  info: FormInfoValues;

  setInfo: (info: FormInfoValues) => void;

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
  // info: defaultFormInfoValues,

  info: { ...defaultFormInfoValues, total_area: "100" },

  setInfo: (info: FormInfoValues) => {
    set((state) => ({
      info: {
        ...state.info,
        ...info
      }
    }));
  },

  rootKeys: [],
  itemKeys: [],
  itemByKey: {},

  // rootKeys: defaultValues.rootKeys,
  // itemKeys: defaultValues.itemKeys,
  // itemByKey: defaultValues.itemByKey,

  addItem: (item: BoqItem) => {
    const current = get();
    const rootKeys = current.rootKeys;
    const itemByKey = current.itemByKey;
    const parent = item.parent_id ? (itemByKey[item.parent_id] as BoqItemGroup) : null;
    const parentNumber = parent?.number ? parent.number : "";

    // ใส่ค่า number ให้ group 1.1, 1.1.1
    if (item.type == "group") {
      if (parentNumber === "") {
        item.number = (rootKeys.length + 1).toString();
        item.level = 1;
      } else {
        item.number = `${parentNumber}.${(parent?.group_childs?.length || 0) + 1}`;
        item.level = parent?.level ? parent.level + 1 : 1;
      }
    }

    // ใส่ค่า owner ให้ item
    if (item.type == "material") {
      item.owner_unit_total = item.unit_rate_by_owner && item.work_rate_by_owner == false ? item.unit_rate_total : 0;
      //
      item.owner_unit_work_total = item.work_rate_by_owner ? item.unit_rate_total : 0;
      item.owner_work_total = item.work_rate_by_owner ? item.work_rate_total : 0;
    }

    // ใส่ childs ให้ parent
    if (parent) {
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
        // add item โดยไม่มี group ไม่ได้
        return;
      }
    }

    // update parents totals
    if (item.parents.length) {
      item.parents.forEach((parentId) => {
        const parent = itemByKey[parentId] as BoqItemGroup;

        if (parent.childs == null) {
          parent.childs = [];
        }

        parent.childs.push(item.id);

        // ทำเฉพาะ material เท่านั้น เพราะ group เริ่มต้นมีค่า 0
        if (parent && item.type == "material") {
          parent.unit_rate_total = numeral(parent.unit_rate_total).add(item.unit_rate_total).value() || 0;
          parent.work_rate_total = numeral(parent.work_rate_total).add(item.work_rate_total).value() || 0;
          parent.total = numeral(parent.total).add(item.total).value() || 0;

          // update owner total ถ้ามีค่า true
          if (item.unit_rate_by_owner) {
            parent.owner_unit_total =
              numeral(parent.owner_unit_total || 0)
                .add(item.owner_unit_total)
                .value() || 0;
          }

          if (item.work_rate_by_owner) {
            parent.owner_unit_work_total =
              numeral(parent.owner_unit_work_total || 0)
                .add(item.owner_unit_work_total)
                .value() || 0;

            parent.owner_work_total =
              numeral(parent.owner_work_total || 0)
                .add(item.owner_work_total)
                .value() || 0;
          }
        }
      });
    }

    // console.log(itemByKey, item);

    set((state) => ({
      rootKeys: [...rootKeys],
      itemKeys: [...state.itemKeys, item.id],
      itemByKey: {
        ...itemByKey,
        [item.id]: item
      }
    }));
  },

  removeItem: (id: string) => {
    let current = get();
    let rootKeys = current.rootKeys;
    let itemKeys = current.itemKeys;
    let itemByKey = current.itemByKey;
    let item = itemByKey[id];

    if (!item) {
      return;
    }

    // update parent total
    item.parents?.forEach((parentId) => {
      const parent = itemByKey[parentId] as BoqItemGroup;
      //
      if (parent) {
        parent.unit_rate_total = numeral(parent.unit_rate_total).subtract(item.unit_rate_total).value() || 0;
        parent.work_rate_total = numeral(parent.work_rate_total).subtract(item.work_rate_total).value() || 0;
        parent.total = numeral(parent.total).subtract(item.total).value() || 0;
        //
        parent.owner_unit_total =
          numeral(parent.owner_unit_total || 0)
            .subtract(item.owner_unit_total)
            .value() || 0;

        parent.owner_unit_work_total =
          numeral(parent.owner_unit_work_total || 0)
            .subtract(item.owner_unit_work_total)
            .value() || 0;

        parent.owner_work_total =
          numeral(parent.owner_work_total || 0)
            .subtract(item.owner_work_total)
            .value() || 0;

        //
        if (item.type == "group") {
          parent.group_childs = parent.group_childs?.filter((childId) => childId !== id);
        } else {
          parent.material_childs = parent.material_childs?.filter((childId) => childId !== id);
        }
      }
    });

    // remove from rootKeys
    if (item.parent_id == null) {
      rootKeys = rootKeys.filter((key) => key !== id);
    }

    // recursive function remove id from itemByKey
    const removeChilds = (item: BoqItem) => {
      if (item.type == "group") {
        item.group_childs?.forEach((childId) => {
          removeChilds(itemByKey[childId]);
        });
        item.material_childs?.forEach((childId) => {
          removeChilds(itemByKey[childId]);
        });
      }

      delete itemByKey[item.id];
      itemKeys = itemKeys.filter((key) => key !== item.id);
    };

    // // remove from itemKeys
    // itemKeys = itemKeys.filter((key) => key !== id);

    // // remove from itemByKey
    // delete itemByKey[id];

    removeChilds(item);

    // console.log(itemKeys, itemByKey);

    set((state) => ({
      rootKeys: [...rootKeys],
      itemKeys: [...itemKeys],
      itemByKey: {
        ...itemByKey
      }
    }));
  },

  updateItem: (id: string, item: BoqItem) => {
    if (item.type == "material") {
      // update total parents
      const current = get();
      const itemByKey = current.itemByKey;
      const currentItem = itemByKey[id] as BoqItemMaterial;

      //
      item.owner_unit_total = item.unit_rate_by_owner && item.work_rate_by_owner == false ? item.unit_rate_total : 0;
      item.owner_unit_work_total = item.work_rate_by_owner ? item.unit_rate_total : 0;
      item.owner_work_total = item.work_rate_by_owner ? item.work_rate_total : 0;

      item.parents?.forEach((parentId) => {
        const parent = itemByKey[parentId] as BoqItemGroup;
        //
        if (parent) {
          parent.unit_rate_total =
            numeral(parent.unit_rate_total).subtract(currentItem.unit_rate_total).add(item.unit_rate_total).value() ||
            0;

          parent.work_rate_total =
            numeral(parent.work_rate_total).subtract(currentItem.work_rate_total).add(item.work_rate_total).value() ||
            0;

          parent.total = numeral(parent.total).subtract(currentItem.total).add(item.total).value() || 0;

          // update owner total ถ้ามีค่า true
          if (item.unit_rate_by_owner) {
            parent.owner_unit_total =
              numeral(parent.owner_unit_total || 0)
                .subtract(currentItem.owner_unit_total)
                .add(item.owner_unit_total)
                .value() || 0;
          }
          if (item.work_rate_by_owner) {
            parent.owner_unit_work_total =
              numeral(parent.owner_unit_work_total || 0)
                .subtract(currentItem.owner_unit_work_total)
                .add(item.owner_unit_work_total)
                .value() || 0;

            parent.owner_work_total =
              numeral(parent.owner_work_total || 0)
                .subtract(currentItem.owner_work_total)
                .add(item.owner_work_total)
                .value() || 0;
          }
        }
      });

      console.log(itemByKey);

      set((state) => ({
        itemByKey: {
          ...itemByKey,
          [id]: {
            ...itemByKey[id],
            ...item
          }
        }
      }));
    } else {
      set((state) => ({
        itemByKey: {
          ...state.itemByKey,
          [id]: {
            ...state.itemByKey[id],
            ...item
          }
        }
      }));
    }
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
