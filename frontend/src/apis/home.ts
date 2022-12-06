import axios from "axios";
import { home } from "../urls";

interface IHeaders {
  "access-token": string;
  client: string;
  uid: string;
}

interface IReturnData {
  diaries: [
    diary: {
      id: number;
      date: string;
      content: string;
      picture_url: string | undefined;
      tag_list: Array<string | undefined>;
      movie_source: string;
      user_id: number;
    }
  ];
  pagy: {
    page: number;
    pages: number;
  };
}

export const fetchHome = (
  headers: IHeaders,
  searchWord: undefined | string | Date = undefined
): Promise<IReturnData> => {
  return axios
    .get(home, {
      headers: { ...headers },
      params: { content_or_date_cont: searchWord },
    })
    .then((res) => res.data);
};

export const getDiaies = (
  headers: IHeaders,
  page: number,
  searchWord: undefined | string | Date
): Promise<IReturnData> => {
  return axios
    .get(home, {
      headers: { ...headers },
      params: { content_or_date_cont: searchWord, page: page },
    })
    .then((res) => res.data);
};
