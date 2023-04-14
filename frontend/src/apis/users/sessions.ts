import axios from "axios";
import { signIn, signOut, guestSignIn, userLogin } from "../../urls";

// helpers
import { getCookie } from "../../helpers";
// types
import {
  IUserParams as IParams,
  IUserResult as IResult,
  IGestResult,
} from "../../types/apis";

export const createSession = (
  params: Pick<IParams, "email" | "password">
): Promise<IResult> => {
  return axios.post(signIn, {
    email: params.email,
    password: params.password,
  });
};

export const getCurrentUser = (): Promise<IResult> => {
  return axios.post(
    userLogin,
    {},
    {
      headers: {
        "access-token": getCookie("access-token"),
        client: getCookie("client"),
        uid: getCookie("uid"),
      },
    }
  );
};

export const deleteSession = (): Promise<void> => {
  return axios.delete(signOut, {
    headers: {
      "access-token": getCookie("access-token"),
      client: getCookie("client"),
      uid: getCookie("uid"),
    },
  });
};

export const newGuestSession = (): Promise<IGestResult> => {
  return axios.post(guestSignIn);
};
