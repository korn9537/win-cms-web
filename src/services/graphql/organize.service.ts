import { compactQuery } from "@/helpers/compact-query";
import axios from "axios";
import { OrganizeModel } from "./models/organize.model";
import { CreateOrganizeDTO } from "./dto/create-organize.input";

const endpoint = "/graphql";

export type TreeViewModel = {
  id: string;
  name: string;
  type: string;
  children: TreeViewModel[];
};

const recursiveListToTree = (tree: TreeViewModel, list: OrganizeModel[], parentId: string | null) => {
  const children = list
    .filter((x) => x.parent_id === parentId)
    .sort((a, b) => {
      if (a.type == "position" && b.type != "position") {
        return -1;
      }
      if (a.type == b.type) {
        return 1;
      }
      return 0;
    });
  children.forEach((item) => {
    tree.children.push({
      id: item.id,
      name: item.name_th,
      type: item.type,
      children: []
    });
    recursiveListToTree(tree.children![tree.children!.length - 1], list, item.id);
  });
};

export const convertOrganizeListToTree = (rootName: string = "ROOT", list: OrganizeModel[]): TreeViewModel => {
  const root: TreeViewModel = {
    id: "root",
    name: rootName,
    type: "root",
    children: []
  };

  recursiveListToTree(root, list, null);

  return root;
};

export const getOrganizeList = async (parentId: string | null): Promise<OrganizeModel[]> => {
  const query = `
    query organizeChilds($parent_id: String) {
      organizes: organizeChilds(parent_id: $parent_id) {
        id
        code
        name_th
        name_en
        level
        parent_id
        type
      }
    }
`;

  const variables = {
    parent_id: parentId
  };

  const {
    data: { data, errors }
  } = await axios.post(endpoint, { query: compactQuery(query), variables });

  return data.organizes;
};

export const createOrganize = async (organize: CreateOrganizeDTO): Promise<string> => {
  const query = `
    mutation createBusinessUnit($data: CreateBusinessUnitDTO!) {
        createBusinessUnit(data: $data) {
          id
        }
    }
`;

  const {
    data: { data, errors }
  } = await axios.post(endpoint, {
    query: compactQuery(query),
    variables: { data: organize }
  });

  return data.createBusinessUnit.id;
};

// export const updateOrganize = async (user: UpdateUserDTO): Promise<string> => {
//   const query = `
//     mutation updateUser($user: UpdateUserDTO!) {
//         updateUser(user: $user) {
//           id
//         }
//     }
// `;

//   const {
//     data: { data, errors }
//   } = await axios.post(endpoint, {
//     query: compactQuery(query),
//     variables: { user }
//   });

//   return data.updateUser.id;
// };
