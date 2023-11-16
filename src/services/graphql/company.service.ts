import axios from "axios";
import { CreateCompanyDTO } from "./dto/create-company.input";
import { compactQuery } from "@/helpers/compact-query";
import { CompanyModel } from "./models/company.model";
import { DocumentFormatGroupModel } from "./models/document-format.model";

const endpoint = "/graphql";

export const createCompany = async (body: CreateCompanyDTO) => {
  const query = `
    mutation createCompany($company: CreateCompanyDTO!) {
        createCompany(company: $company) {
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

  return data.data.createCompany;
};

export const getCompanies = async (): Promise<CompanyModel[]> => {
  const query = `
    query companies {
        companies {
          id,
          code,
          name_th,
          logo_image_url,
          corporate_crest_url
        }
    }
`;

  const { data } = await axios.post(endpoint, {
    query: compactQuery(query)
  });

  return data.data.companies;
};

export const getCompanyForLayoutData = async (code: string): Promise<CompanyModel> => {
  const query = `
    query companyByCode($code: String!) {
        companyByCode(code: $code) {
          id,
          code,
          name_th,
          logo_image_url,
          corporate_crest_url
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

  return data.data.companyByCode;
};

export const getCompanyInfo = async () => {
  const query = `
    query company {
        company {
            id,
            code,
            name,
            image,
            tax_code,
            phone,
        }
    }
`;

  const { data } = await axios.post(endpoint, {
    query
  });

  return data.data.profile;
};

export const getCompanyAddress = async () => {
  const query = `
    query company {
        company {
            address
        }
    }
`;

  const { data } = await axios.post(endpoint, {
    query
  });

  return data.data.profile;
};

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

export const getRunningDocument = async (groupCode: string): Promise<DocumentFormatGroupModel> => {
  const query = `
    query runningFormatGroup($code: String!) {
      format_groups: runningFormatGroup(code: $code) {
        id
        code
        name_th
        formats {
          id
          running_key
          run_format
        }
      }
    }`;

  const variables = {
    code: groupCode
  };

  const { data } = await axios.post(endpoint, {
    query: compactQuery(query),
    variables
  });

  return data.data.format_groups;
};
