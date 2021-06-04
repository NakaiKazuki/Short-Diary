import axios from "axios";
import { home, homePagination } from "../urls";

interface ICurrentUserHeaders {
  "access-token": string;
  client: string;
  uid: string;
}

export const fetchHome = (
  currentUserHeaders: ICurrentUserHeaders
): Promise<any> => {
  return axios
    .get(home, {
      headers: currentUserHeaders,
    })
    .then((res) => res.data)
    .catch((e) => {
      throw e;
    });
};

export const getDiaies = (
  currentUserHeaders: ICurrentUserHeaders,
  page: number
): Promise<any> => {
  return axios
    .get(`${homePagination}${page}`, {
      headers: currentUserHeaders,
    })
    .then((res) => res.data)
    .catch((e) => {
      throw e;
    });
};
