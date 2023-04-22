import axios from "axios";
import bcrypt from "bcryptjs";
import Cookies from "js-cookie";
// types
import {
  TAxiosGet,
  TAxiosPut,
  TAxiosPost,
  TAxiosPatch,
  TAxiosDelete,
} from "../types/apis";

const getCookie = (name: string): string => {
  return Cookies.get(name) ?? "";
};

// ヘッダーを設定する
const setHeaders = (): IHeaders => {
  return {
    "access-token": getCookie("access-token"),
    client: getCookie("client"),
    uid: getCookie("uid"),
  };
};

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const axiosGet: TAxiosGet = <T>(url: string, data: T) => {
  return axios.get(url, { headers: setHeaders(), ...data });
};

export const axiosPut: TAxiosPut = <T>(url: string, data: T) => {
  return axios.put(url, data, { headers: setHeaders() });
};

export const axiosPost: TAxiosPost = <T>(url: string, data: T) => {
  return axios.post(url, data, { headers: setHeaders() });
};

export const axiosPatch: TAxiosPatch = <T>(url: string, data: T) => {
  return axios.patch(url, data, { headers: setHeaders() });
};

export const axiosDelete: TAxiosDelete = <T>(url: string, data: T) => {
  return axios.delete(url, { headers: setHeaders(), ...data });
};
