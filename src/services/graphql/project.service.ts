import { compactQuery } from "@/helpers/compact-query";
import axios from "axios";
import { IPagination } from "../interfaces/pagination.interface";
import { CreateProjectDTO } from "./dto/create-project.input";
import { ProjectInfoModel, ProjectModel } from "./models/project.model";

const endpoint = "/graphql";

export const createProject = async (body: CreateProjectDTO) => {
  const query = `
    mutation createProject($project: CreateProjectDTO!) {
        createProject(project: $project) {
            id
        }
    }
`;

  const variables = {
    company: body
  };

  const { data } = await axios.post(endpoint, {
    query,
    variables
  });

  return data.data.createProject;
};

export const getProjects = async (
  companyId: string,
  search: string,
  type: string,
  status: string,
  page: number,
  pageSize: number
): Promise<IPagination<ProjectModel>> => {
  const query = `
    query projects($companyId: String!, $search: String!, $type: String!, $status: String!, $page: Int!, $pageSize: Int!) {
      projects(companyId: $companyId, search: $search, projectType: $type, status: $status, page: $page, limit: $pageSize) {
        items {
          id code name_th type status acronym is_active
        }
        page
        totalCount
        pageTotal
        startIndex
        endIndex
      }
    }
`;

  const variables = {
    companyId,
    search,
    type,
    status,
    page,
    pageSize
  };

  const { data } = await axios.post(endpoint, {
    query: compactQuery(query),
    variables
  });

  const res = data.data.projects;

  return {
    items: res.items,
    page: res.page,
    totalCount: res.totalCount,
    pageTotal: res.pageTotal,
    startIndex: res.startIndex,
    endIndex: res.endIndex
  };
};

export const getProjectForLayoutData = async (code: string): Promise<ProjectInfoModel> => {
  const query = `
    query projectByCode($code: String!) {
        project: projectByCode(code: $code) {
          id 
          code 
          name_th 
          type 
          status 
          acronym
          is_active
          model_sizes {
            id
            code
            name_th
          }
          model_types {
            id
            code
            name_th
            models { 
              id
              code
              name_th
            } 
          }
        }
    }
`;

  const variables = {
    code
  };

  const { data } = await axios.post(endpoint, {
    query: compactQuery(query),
    variables
  });

  return data.data.project;
};

// export const getCompanyInfo = async () => {
//   const query = `
//     query company {
//         company {
//             id,
//             code,
//             name,
//             image,
//             tax_code,
//             phone,
//         }
//     }
// `;

//   const { data } = await axios.post(endpoint, {
//     query
//   });

//   return data.data.profile;
// };

// export const getCompanyAddress = async () => {
//   const query = `
//     query company {
//         company {
//             address
//         }
//     }
// `;

//   const { data } = await axios.post(endpoint, {
//     query
//   });

//   return data.data.profile;
// };

// export const getCompanyInfo = async () => {
//   const query = `
//     query company {
//         company {
//             id,
//             code,
//             name,
//             image,
//             address,
//             tax_code,
//             phone,
//         }
//     }
// `;

//   const { data } = await axios.post(endpoint, {
//     query
//   });

//   return data.data.profile;
// };
