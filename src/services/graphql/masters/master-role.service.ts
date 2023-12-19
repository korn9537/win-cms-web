import axios from "axios";
import { CreateRoleDTO, UpdateRoleDTO } from "../dto/create-role.input";
import { RoleModel } from "../models/role.model";
import { compactQuery } from "@/helpers/compact-query";
import { UserModel } from "../models/user.model";

const endpoint = "/graphql";

export const getMasterRoles = async (withCount: boolean = false): Promise<RoleModel[]> => {
  const query = `
    query userRoles {
      userRoles {
        id
        code
        name_th
        name_en
        is_active
        ${withCount ? "user_count" : ""}
      }
    }
`;

  const {
    data: { data, errors }
  } = await axios.post(endpoint, {
    query: compactQuery(query)
  });

  return data.userRoles;
};

export const createMasterRole = async (input: CreateRoleDTO): Promise<string> => {
  const query = `
    mutation addUserRole($data: CreateRoleDTO!) {
      addUserRole(data: $data) {
        id
      }
    }
`;

  const variables = {
    data: input
  };

  const {
    data: { data, errors }
  } = await axios.post(endpoint, {
    query: compactQuery(query),
    variables
  });

  return data.addUserRole.id;
};

export const updateMasterRole = async (id: string, input: UpdateRoleDTO): Promise<string> => {
  const query = `
    mutation updateUserRole($id: String!, $data: CreateRoleDTO!) {
      updateUserRole(id: $id, data: $data) {
        id
      }
    }
`;

  const variables = {
    id,
    data: input
  };

  const {
    data: { data, errors }
  } = await axios.post(endpoint, {
    query: compactQuery(query),
    variables
  });

  return data.updateUserRole.id;
};

export const deleteMasterRole = async (id: string): Promise<boolean> => {
  const query = `
    mutation deleteUserRole($id: String!) {
      deleteUserRole(id: $id)
    }
`;

  const variables = {
    id
  };

  const {
    data: { data, errors }
  } = await axios.post(endpoint, {
    query: compactQuery(query),
    variables
  });

  return data.deleteUserRole;
};

export const getUsersInRole = async (id: string): Promise<UserModel[]> => {
  const query = `
    query usersInRole($id: String!) {
      usersInRole(id: $id) {
        id
        code
        fullname
      }
    }
`;

  const variables = {
    id
  };

  const {
    data: { data, errors }
  } = await axios.post(endpoint, {
    query: compactQuery(query),
    variables
  });

  return data.usersInRole;
};

export const addUsersToRole = async (id: string, users: string[]): Promise<boolean> => {
  const query = `
    mutation addRoleUsers($data: AddRoleUsersDTO!) {
      addRoleUsers(data: $data)
    }
`;

  const variables = {
    data: {
      role_id: id,
      users
    }
  };

  const {
    data: { data, errors }
  } = await axios.post(endpoint, {
    query: compactQuery(query),
    variables
  });

  return data.addRoleUsers;
};

export const removeUserFromRole = async (id: string, user_id: string): Promise<boolean> => {
  const query = `
    mutation removeRoleUsers($role_id: String!, $user_id: String!) {
      removeRoleUsers(role_id: $role_id, user_id: $user_id)
    }
`;

  const variables = {
    role_id: id,
    user_id
  };

  const {
    data: { data, errors }
  } = await axios.post(endpoint, {
    query: compactQuery(query),
    variables
  });

  return data.removeRoleUsers;
};
