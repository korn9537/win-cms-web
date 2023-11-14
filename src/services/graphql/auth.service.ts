import { compactQuery } from "@/helpers/compact-query";
import axios from "axios";
import { ProfileModel } from "./models/profile.model";

const endpoint = "/graphql";

export const login = async (username: string, password: string): Promise<string> => {
  const query = `
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
        }
    }
`;

  const variables = {
    username,
    password
  };

  const {
    data: { data, errors }
  } = await axios.post(endpoint, { query, variables });
  return data.login.token;
};

export const logout = async () => {
  const query = `
    mutation logout {
        logout
    }
`;

  const {
    data: { data, errors }
  } = await axios.post(endpoint, {
    query
  });

  return data.logout;
};

export const getProfile = async (token?: string): Promise<ProfileModel> => {
  const query = `
    query profile {
      profile {
        user {
          id,
          fullname,
          email,
          thumbnail
        }
        permissions,
        role
      }
    }
`;

  const {
    data: { data, errors }
  } = await axios.post(
    endpoint,
    {
      query: compactQuery(query)
    },
    { headers: token ? { Authorization: `Bearer ${token}` } : {} }
  );

  return data.profile.user;
};
