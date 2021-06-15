import axios from "axios";
import { home } from "../urls";

interface ICurrentUserHeaders {
  "access-token": string;
  client: string;
  uid: string;
}

export const fetchHome = (
  currentUserHeaders: ICurrentUserHeaders,
  searchWord: undefined | string = undefined,
): Promise<any> => {
  return axios
    .get(home, {
      headers: currentUserHeaders,
      params: {date_cont: searchWord},
    })
    .then((res) => res.data)
    .catch((e) => {
      throw e;
    });
};

export const getDiaies = (
  currentUserHeaders: ICurrentUserHeaders,
  page: number,
  searchWord: undefined | string,
): Promise<any> => {
  return axios
    .get(home, {
      headers: currentUserHeaders,
      params: {date_cont: searchWord, page: page},
    })
    .then((res) => res.data)
    .catch((e) => {
      throw e;
    });
};
