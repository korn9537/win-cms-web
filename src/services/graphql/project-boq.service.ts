import axios from "axios";
import { CreateProjectBoqDTO } from "./dto/create-project-boq.input";

const endpoint = "/graphql";

export type ProjectBoqHeaderModel = {
  id: string;
  code: string;
  name: string;
  model_type: {
    id: string;
    name_th: string;
  };
  model: {
    id: string;
    name_th: string;
  };
  document_date: string;
  total_area: number;
  total_cost: number;
  average_price: number;
  state: string;
};

export const getProjectBoqHeaders = async (): Promise<ProjectBoqHeaderModel[]> => {
  const query = `
    query projectBoqHeaders {
      projectBoqHeaders {
        id
        code
        name
        model_type {
          id
          name_th
        }
        model {
          id
          name_th
        }
        document_date
        total_area
        total_cost
        average_price
        state
      }
    }
`;

  const { data } = await axios.post(endpoint, {
    query
  });

  return data.data.projectBoqHeaders;
};

export const createProjectBoq = async (body: CreateProjectBoqDTO) => {
  const query = `
    mutation createProjectBoq($data: CreateProjectBoqDTO!) {
        createProjectBoq(data: $data) {
            id
        }
    }
`;

  const variables = {
    data: body
  };

  const { data } = await axios.post(endpoint, {
    query,
    variables
  });

  return data.data.createProjectBoq;
};
