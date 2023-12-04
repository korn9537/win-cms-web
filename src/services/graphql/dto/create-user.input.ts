export type CreateUserDTO = {
  code: string;

  first_name: string;

  last_name: string;

  email: string;

  mobile?: string;

  username?: string;

  password: string;

  // password_no_expire?: boolean;

  is_active?: boolean;

  image_id?: string;

  position_id?: string;

  department_id?: string;

  role_ids?: string[];
};

export type UpdateUserDTO = Omit<CreateUserDTO, "password"> & {
  id: string;
};
