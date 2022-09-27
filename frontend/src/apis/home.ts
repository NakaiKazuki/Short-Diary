import axios from "axios";
import { home } from "../urls";

interface ICurrentUserHeaders {
  "access-token": string;
  client: string;
  uid: string;
}

export const fetchHome = (
  currentUserHeaders: ICurrentUserHeaders,
  searchWord: undefined | string | Date = undefined
): Promise<any> => {
  return axios
    .get(home, {
      headers: { ...currentUserHeaders },
      params: { content_or_date_cont: searchWord },
    })
    .then((res) => res.data);
};

export const getDiaies = (
  currentUserHeaders: ICurrentUserHeaders,
  page: number,
  searchWord: undefined | string | Date
): Promise<any> => {
  return axios
    .get(home, {
      headers: { ...currentUserHeaders },
      params: { content_or_date_cont: searchWord, page: page },
    })
    .then((res) => res.data);
};
