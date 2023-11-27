export type UserModel = {
  id: string;
  code: string;
  fullname?: string;
  email: string;
  thumbnail?: string;
  is_active: boolean;
};

export type UserInfoModel = UserModel & {
  first_name: string;
  last_name: string;
  mobile: string;
  image_id: string;
  password?: string;
  department_id?: string;
  position_id?: string;
  role_ids?: string[];
};
