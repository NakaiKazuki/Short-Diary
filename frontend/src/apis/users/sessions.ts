import { signIn, signOut, guestSignIn, userLogin } from "../../urls";

// helpers
import { axiosPost, axiosDelete } from "../../helpers";

// types
import {
  IUserParams as IParams,
  IUserResult as IResult,
  IGestResult,
} from "../../types/apis";

export const createSession = (
  params: Pick<IParams, "email" | "password">
): Promise<IResult> => {
  return axiosPost(signIn, params);
};

export const getCurrentUser = (): Promise<IResult> => {
  return axiosPost(userLogin, {});
};

export const deleteSession = (): Promise<void> => {
  return axiosDelete(signOut);
};

export const newGuestSession = (): Promise<IGestResult> => {
  return axiosPost(guestSignIn);
};
