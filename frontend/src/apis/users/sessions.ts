import axios from "axios";
import { signIn, signOut, guestSignIn } from "../../urls";

interface IParams {
  email: string;
  password: string;
}

interface ICurrentUserHeaders {
  "access-token": string;
  client: string;
  uid: string;
}

export const createSession = (params: IParams): Promise<any> => {
  return axios.post(signIn, {
    email: params.email,
    password: params.password,
  });
};

export const deleteSession = (
  currentUserHeaders: ICurrentUserHeaders
): Promise<any> => {
  return axios.delete(signOut, {
    headers: {...currentUserHeaders},
  });
};

export const newGuestSession = (): Promise<any> => {
  return axios.post(guestSignIn);
};
