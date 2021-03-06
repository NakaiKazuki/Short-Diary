import axios from "axios";
import { registration } from "../../urls";

interface ICurrentUserHeaders {
  "access-token": string;
  client: string;
  uid: string;
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

const CONFIRM_SUCCESS_URL: string = process.env.REACT_APP_CONFIRM_SUCCESS_URL!;

export const postRegistration = (params: IPostParams): Promise<any> => {
  return axios.post(registration, {
    name: params.name,
    email: params.email,
    password: params.password,
    password_confirmation: params.password_confirmation,
    confirm_success_url: CONFIRM_SUCCESS_URL,
  });
};

export const putRegistration = (
  currentUserHeaders: ICurrentUserHeaders,
  params: IPutParams
): Promise<any> => {
  return axios.put(registration, {
    ...currentUserHeaders,
    name: params.name,
    email: params.email,
    password: params.password,
    password_confirmation: params.password_confirmation,
    current_password: params.current_password,
  });
};
