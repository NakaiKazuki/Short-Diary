import axios from "axios";
import { registration } from "../../urls";

// helpers
import { setHeaders } from "../../helpers";

// types
import {
  IUserParams as IParams,
  IUserResult as IResult,
} from "../../types/apis";

const CONFIRM_SUCCESS_URL: string | undefined =
  process.env.REACT_APP_CONFIRM_SUCCESS_URL;

export const postRegistration = (
  params: Pick<IParams, "name" | "email" | "password" | "password_confirmation">
): Promise<void> => {
  return axios.post(registration, {
    name: params.name,
    email: params.email,
    password: params.password,
    password_confirmation: params.password_confirmation,
    confirm_success_url: CONFIRM_SUCCESS_URL,
  });
};

export const putRegistration = (params: IParams): Promise<IResult> => {
  return axios.put(
    registration,
    {
      name: params.name,
      email: params.email,
      password: params.password,
      password_confirmation: params.password_confirmation,
      current_password: params.current_password,
    },
    {
      headers: setHeaders(),
    }
  );
};
