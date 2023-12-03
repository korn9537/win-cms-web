import { compactQuery } from "@/helpers/compact-query";
import axios from "axios";
import { CreateUserDTO, UpdateUserDTO } from "./dto/create-user.input";
import { UserInfoModel, UserModel } from "./models/user.model";

const endpoint = "/graphql";

export const getUsers = async (search: string = "", status: string = ""): Promise<UserModel[]> => {
  const query = `
    query users($search: String, $status: String) {
        users(search: $search, status: $status) {
          items {
            id
            code
            fullname
            thumbnail
            email
            is_active
          }
        }
    }
`;

  const variables = {
    search,
    status
  };

  const {
    data: { data, errors }
  } = await axios.post(endpoint, { query: compactQuery(query), variables });
  return data.users.items;
};

export const getUserByCode = async (code: string): Promise<UserInfoModel> => {
  const query = `
    query user($code: String) {
        user(code: $code) {
          id
          code
          first_name
          last_name
          thumbnail
          email
          mobile
          is_active
        }
    }
`;

  const {
    data: { data, errors }
  } = await axios.post(endpoint, { query: compactQuery(query), variables: { code } });
  return data.user;
};

export const createUser = async (user: CreateUserDTO): Promise<string> => {
  const query = `
    mutation createUser($user: CreateUserDTO!) {
        createUser(user: $user) {
          id
        }
    }
`;

  const {
    data: { data, errors }
  } = await axios.post(endpoint, {
    query: compactQuery(query),
    variables: { user }
  });

  return data.createUser.id;
};

export const updateUser = async (user: UpdateUserDTO): Promise<string> => {
  const query = `
    mutation updateUser($user: UpdateUserDTO!) {
        updateUser(user: $user) {
          id
        }
    }
`;

  const {
    data: { data, errors }
  } = await axios.post(endpoint, {
    query: compactQuery(query),
    variables: { user }
  });

  return data.updateUser.id;
};
