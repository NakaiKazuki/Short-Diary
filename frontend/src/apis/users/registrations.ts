import { registration } from "../../urls";

// helpers
import { axiosPut, axiosPost } from "../../helpers";

// types
import {
  IUserParams as IParams,
  IUserResult as IResult,
} from "../../types/apis";

// const CONFIRM_SUCCESS_URL: string  =
//   process.env.REACT_APP_CONFIRM_SUCCESS_URL;

export const postRegistration = (
  params: Pick<IParams, "name" | "email" | "password" | "password_confirmation">
): Promise<void> => {
  return axiosPost(registration, params);
};

export const putRegistration = (params: IParams): Promise<IResult> => {
  return axiosPut(registration, params);
};
