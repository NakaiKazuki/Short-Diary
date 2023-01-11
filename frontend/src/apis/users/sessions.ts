import axios from "axios";
import { signIn, signOut, guestSignIn } from "../../urls";

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

interface returnData {
  data: { current_user: ICurrentUser };
  headers: IHeaders;
}

export const createSession = (params: IParams): Promise<returnData> => {
  return axios.post(signIn, {
    email: params.email,
    password: params.password,
  });
};

export const deleteSession = (headers: IHeaders): Promise<void> => {
  return axios.delete(signOut, {
    headers: { ...headers },
  });
};

export const newGuestSession = (): Promise<returnData> => {
  return axios.post(guestSignIn);
};
