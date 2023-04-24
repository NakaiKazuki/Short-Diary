import { registration } from "../../urls";

// helpers
import { axiosPut, axiosPost } from "../../helpers";

// types
import {
  IUserParams as IParams,
  IUserResult as IResult,
} from "../../types/apis";

export const postRegistration = (
  params: Pick<IParams, "name" | "email" | "password" | "password_confirmation">
): Promise<void> => {
  return axiosPost(registration, params);
};

export const putRegistration = (
  params: Pick<
    IParams,
    "name" | "email" | "password" | "password_confirmation" | "current_password"
  >
): Promise<IResult> => {
  return axiosPut(registration, params);
};
