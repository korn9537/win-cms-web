import axios from "axios";

const endpoint = "/graphql";

export type MasterCostCodeModel = {
  code: string;
  name_th: string;
  group: MasterCostCodeGroupModel;
};

export type MasterCostCodeGroupModel = {
  id: string;
  code: string;
  name_th: string;
};

export const getMasterCostCodes = async (): Promise<MasterCostCodeModel[]> => {
  const query = `
    query costCodes {
        items: costCodes {
            code
            name_th
            group {
                id
                code
                name_th
            }
        }
    }
`;

  const { data } = await axios.post(endpoint, {
    query
  });

  return data.data.items;
};
