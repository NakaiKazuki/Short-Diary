import axios from "axios";
import Cookies from "js-cookie";
import { signIn, signOut, guestSignIn, userLogin } from "../../urls";

interface IParams {
  email: string;
  password: string;
}

interface IHeaders {
  "access-token": string;
  client: string;
  uid: string;
}

interface ICurrentUser {
  id: number;
  name: string;
  email: string;
}

interface IResult {
  data: ICurrentUser;
  headers: IHeaders;
}

export const createSession = (params: IParams): Promise<IResult> => {
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
        "access-token": Cookies.get("access-token") || "",
        client: Cookies.get("client") || "",
        uid: Cookies.get("uid") || "",
      },
    }
  );
};

export const deleteSession = (): Promise<void> => {
  return axios.delete(signOut, {
    headers: {
      "access-token": Cookies.get("access-token") || "",
      client: Cookies.get("client") || "",
      uid: Cookies.get("uid") || "",
    },
  });
};

export const newGuestSession = (): Promise<IResult> => {
  return axios.post(guestSignIn);
};
