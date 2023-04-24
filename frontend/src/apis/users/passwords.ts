import { password } from "../../urls";
import axios from "axios";
// helpers
import { axiosPost } from "../../helpers";

// types
import { IUserParams as IParams } from "../../types/apis";

export const postResetPassword = (
  params: Pick<IParams, "email">
): Promise<void> => {
  return axiosPost(password, params);
};

export const putNewPassword = (
  params: Pick<
    IParams,
    "password" | "password_confirmation" | "reset_password_token"
  >,
  headers: IHeaders
): Promise<void> => {
  const data = {
    ...params,
    ...headers,
  };
  return axios.put(password, data);
};
