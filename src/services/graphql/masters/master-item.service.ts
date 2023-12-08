import { compactQuery } from "@/helpers/compact-query";
import axios from "axios";

const endpoint = "/graphql";

// export type MasterItemModel = {
//   items: ItemModel[];
// };

export type MasterItemModel = {
  id: string;
  code: string;
  name_th: string;
  group_id: string;
  unit_id: string;
  group: MasterItemGroupModel;
  unit: MasterItemUnitModel;
};

export type MasterItemGroupModel = {
  id: string;
  code: string;
  name_th: string;
};

export type MasterItemUnitModel = {
  id: string;
  code: string;
  name_th: string;
};

export const getMasterItems = async (): Promise<MasterItemModel[]> => {
  const query = `
    query masterItems {
      items {
        id
        code
        name_th
        group_id
        unit_id
        group {
          id
          name_th
        }
        unit {
          id
          name_th
        }
      }
    }
`;

  const { data } = await axios.post(endpoint, {
    query: compactQuery(query)
  });

  return data.data.items;
};

export const getMasterItemUnits = async (): Promise<MasterItemUnitModel[]> => {
  const query = `
    query masterItems {
      items: itemUnits {
        id
        code
        name_th
      }
    }
`;

  const { data } = await axios.post(endpoint, {
    query: compactQuery(query)
  });

  return data.data.items;
};
