import axios from "axios";
import { home } from "../urls";

interface ICurrentUserHeaders {
  "access-token": string;
  client: string;
  uid: string;
}

export const fetchHome = (
  currentUserHeaders: ICurrentUserHeaders,
  searchItem: any = undefined
): Promise<any> => {
  return axios
    .get(home, {
      headers: {...currentUserHeaders},
      params: { date_or_content_cont: searchItem },
    })
    .then((res) => res.data);
};

export const getDiaies = (
  currentUserHeaders: ICurrentUserHeaders,
  page: number,
  searchWord: undefined | string
): Promise<any> => {
  return axios
    .get(home, {
      headers: {...currentUserHeaders},
      params: { date_or_content_cont: searchWord, page: page },
    })
    .then((res) => res.data);
};
