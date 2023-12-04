import { compactQuery } from "@/helpers/compact-query";
import axios from "axios";
import { OrganizeModel } from "./models/organize.model";
import { CreateOrganizeDTO } from "./dto/create-organize.input";
import { UserModel } from "./models/user.model";

const endpoint = "/graphql";

export type TreeViewModel = {
  id: string;
  name: string;
  type: string;
  children: TreeViewModel[];
  data?: OrganizeModel;
};

const recursiveListToTree = (tree: TreeViewModel, list: OrganizeModel[], parentId: string | null) => {
  const children = list.filter((x) => x.parent_id === parentId);
  // .sort((a, b) => {
  //   if (a.type == "position" && b.type != "position") {
  //     return -1;
  //   }
  //   if (a.type == b.type) {
  //     return 1;
  //   }
  //   return 0;
  // });
  children.forEach((item) => {
    tree.children.push({
      id: item.id,
      name: item.name_th,
      type: item.type,
      children: [],
      data: item
    });
    recursiveListToTree(tree.children![tree.children!.length - 1], list, item.id);
  });
};

export const convertOrganizeListToTree = (rootName: string = "ROOT", list: OrganizeModel[]): TreeViewModel => {
  const root: TreeViewModel = {
    id: "root",
    name: rootName,
    type: "root",
    children: [],
    data: {
      id: "root",
      code: "",
      name_th: rootName,
      name_en: rootName,
      level: 0,
      parent_id: null,
      type: "root"
    }
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

export const updateOrganize = async (id: string, organize: CreateOrganizeDTO): Promise<string> => {
  const query = `
    mutation updateBusinessUnit($id: String!, $data: CreateBusinessUnitDTO!) {
        updateBusinessUnit(id: $id, data: $data) {
          id
        }
    }
`;

  const {
    data: { data, errors }
  } = await axios.post(endpoint, {
    query: compactQuery(query),
    variables: { id, data: organize }
  });

  return data.updateBusinessUnit.id;
};

export const deleteOrganize = async (id: string): Promise<string> => {
  const query = `
    mutation deleteBusinessUnit($id: String!) {
        deleteBusinessUnit(id: $id)
    }
`;

  const {
    data: { data, errors }
  } = await axios.post(endpoint, {
    query: compactQuery(query),
    variables: { id }
  });

  return data.deleteBusinessUnit;
};

export const getOrganizeUsers = async (id: string): Promise<UserModel[]> => {
  const query = `
    query organizeUsers($id: String!) {
        organizeUsers(id: $id) {
          id
          code
          fullname
        }
    }
`;

  const {
    data: { data, errors }
  } = await axios.post(endpoint, {
    query: compactQuery(query),
    variables: { id }
  });

  return data.organizeUsers;
};

export const addOrganizeUsers = async (id: string, users: string[]): Promise<boolean> => {
  const query = `
    mutation addOrganizeUsers($data: AddBusinessUnitUsersDTO!) {
        addOrganizeUsers(data: $data)
    }
`;

  const {
    data: { data, errors }
  } = await axios.post(endpoint, {
    query: compactQuery(query),
    variables: { data: { bu_id: id, users } }
  });

  return data.addOrganizeUsers;
};

export const removeOrganizeUsers = async (user_id: string): Promise<boolean> => {
  const query = `
    mutation removeOrganizeUsers($userId: String!) {
        removeOrganizeUsers(userId: $userId)
    }
`;

  const {
    data: { data, errors }
  } = await axios.post(endpoint, {
    query: compactQuery(query),
    variables: { userId: user_id }
  });

  return data.removeOrganizeUsers;
};
