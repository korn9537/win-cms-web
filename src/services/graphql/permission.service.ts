import { compactQuery } from "@/helpers/compact-query";
import axios from "axios";
import { CreatePermissionPageDTO } from "./dto/create-permission-page.input";
import { PermissionEntityModel, PermissionPageModel } from "./models/permission.model";
import { TreeViewModel } from "./models/treeview.model";
import { CreatePermissionEntityDTO } from "./dto/create-permission-entity.input";
import { DeletePermissionDTO, SetPermissionDTO } from "./dto/set-permission.input";

const endpoint = "/graphql";

const recursivePageListToTree = (
  tree: TreeViewModel<PermissionPageModel>,
  list: PermissionPageModel[],
  parentId: string | null
) => {
  const children = list.filter((x) => x.parent_id === parentId);
  //
  children.forEach((item) => {
    tree.children.push({
      id: item.id,
      name: item.name_th,
      type: item.type,
      children: [],
      data: item
    });
    //
    recursivePageListToTree(tree.children![tree.children!.length - 1], list, item.id);
  });
};

export const convertPageListToTree = (
  rootName: string = "ROOT",
  list: PermissionPageModel[]
): TreeViewModel<PermissionPageModel> => {
  const root: TreeViewModel<PermissionPageModel> = {
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
  //
  recursivePageListToTree(root, list, null);
  //
  return root;
};

export const getPageList = async (parentId: string | null, depth: number = 0): Promise<PermissionPageModel[]> => {
  const query = `
    query permissionPages($parent_id: String, $depth: Int) {
      permissionPages(parent_id: $parent_id, depth: $depth) {
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
    parent_id: parentId,
    depth
  };

  const {
    data: { data, errors }
  } = await axios.post(endpoint, { query: compactQuery(query), variables });

  return data.permissionPages;
};

export const createPage = async (organize: CreatePermissionPageDTO): Promise<string> => {
  const query = `
    mutation createPermissionPage($data: CreatePermissionPageDTO!) {
        createPermissionPage(data: $data) {
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

  return data.createPermissionPage.id;
};

export const updatePage = async (id: string, organize: CreatePermissionPageDTO): Promise<string> => {
  const query = `
    mutation updatePermissionPage($id: String!, $data: CreatePermissionPageDTO!) {
        updatePermissionPage(id: $id, data: $data) {
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

  return data.updatePermissionPage.id;
};

export const deletePage = async (id: string): Promise<string> => {
  const query = `
    mutation deletePermissionPage($id: String!) {
        deletePermissionPage(id: $id)
    }
`;

  const {
    data: { data, errors }
  } = await axios.post(endpoint, {
    query: compactQuery(query),
    variables: { id }
  });

  return data.deletePermissionPage;
};

export const getPageEntities = async (pageId?: string): Promise<PermissionEntityModel[]> => {
  if (pageId == null || pageId == "") {
    return [];
  }

  const query = `
    query permissionEntities($page_id: String!) {
      permissionEntities(page_id: $page_id) {
        id
        code
        name_th
        name_en
        page_id
      }
    }
`;

  const variables = {
    page_id: pageId ?? null
  };

  const {
    data: { data, errors }
  } = await axios.post(endpoint, { query: compactQuery(query), variables });

  return data.permissionEntities;
};

export const createPageEntity = async (organize: CreatePermissionEntityDTO): Promise<string> => {
  const query = `
    mutation createPermissionEntity($data: CreatePermissionEntityDTO!) {
        createPermissionEntity(data: $data) {
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

  return data.createPermissionEntity.id;
};

export const updatePageEntity = async (id: string, organize: CreatePermissionEntityDTO): Promise<string> => {
  const query = `
    mutation updatePermissionEntity($id: String!, $data: CreatePermissionEntityDTO!) {
        updatePermissionEntity(id: $id, data: $data) {
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

  return data.updatePermissionEntity.id;
};

export const deletePageEntity = async (id: string): Promise<string> => {
  const query = `
    mutation deletePermissionEntity($id: String!) {
        deletePermissionEntity(id: $id)
    }
`;

  const {
    data: { data, errors }
  } = await axios.post(endpoint, {
    query: compactQuery(query),
    variables: { id }
  });

  return data.deletePermissionEntity;
};

export const setPermission = async (payload: SetPermissionDTO): Promise<string> => {
  const query = `
    mutation setPermission($data: SetPermissionDTO!) {
        setPermission(data: $data)
    }
`;

  const {
    data: { data, errors }
  } = await axios.post(endpoint, {
    query: compactQuery(query),
    variables: { data: payload }
  });

  return data.setPermission;
};

export const removePermission = async (payload: DeletePermissionDTO): Promise<string> => {
  const query = `
    mutation removePermission($data: SetPermissionDTO!) {
        removePermission(data: $data)
    }
`;

  const {
    data: { data, errors }
  } = await axios.post(endpoint, {
    query: compactQuery(query),
    variables: { data: payload }
  });

  return data.removePermission;
};

export const getPermissionByRefId = async (
  ref_id: string,
  ref_type: string,
  page_id: string | null
): Promise<RefPermissionModel[]> => {
  const query = `
    query getPermissionByRefId($ref_id: String!, $ref_type: String!, $page_id: String) {
        getPermissionByRefId(ref_id: $ref_id, ref_type: $ref_type, page_id: $page_id) {
          page_id
          entity_code
        }
    }
`;

  const {
    data: { data, errors }
  } = await axios.post(endpoint, {
    query: compactQuery(query),
    variables: {
      ref_id: ref_id,
      ref_type: ref_type,
      page_id: page_id
    }
  });

  return data.getPermissionByRefId;
};

type RefPermissionModel = {
  page_id: string;
  entity_code: string;
};
