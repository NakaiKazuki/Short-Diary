import axios from "axios";
import Cookies from "js-cookie";
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

interface IResult {
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

export const putRegistration = (params: IPutParams): Promise<IResult> => {
  return axios.put(registration, {
    "access-token": Cookies.get("access-token") || "",
    client: Cookies.get("client") || "",
    uid: Cookies.get("uid") || "",
    name: params.name,
    email: params.email,
    password: params.password,
    password_confirmation: params.password_confirmation,
    current_password: params.current_password,
  });
};
