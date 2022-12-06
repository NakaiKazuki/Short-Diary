import axios from "axios";
import { registration } from "../../urls";

interface IHeaders {
  "access-token": string;
  client: string;
  uid: string;
}

interface IData {
  id: number;
  name: string;
  email: string;
}

interface IPostParams {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface IPutParams {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  current_password: string;
}

interface returnData {
  data: IData;
  headers: IHeaders;
}

const CONFIRM_SUCCESS_URL: string | undefined =
  process.env.REACT_APP_CONFIRM_SUCCESS_URL;

export const postRegistration = (params: IPostParams): Promise<void> => {
  return axios.post(registration, {
    name: params.name,
    email: params.email,
    password: params.password,
    password_confirmation: params.password_confirmation,
    confirm_success_url: CONFIRM_SUCCESS_URL,
  });
};

export const putRegistration = (
  headers: IHeaders,
  params: IPutParams
): Promise<returnData> => {
  return axios.put(registration, {
    ...headers,
    name: params.name,
    email: params.email,
    password: params.password,
    password_confirmation: params.password_confirmation,
    current_password: params.current_password,
  });
};
