import axios from "axios";
import { home } from "../urls";
import Cookies from "js-cookie";

interface IResult {
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
  searchWord: undefined | string | Date = undefined
): Promise<IResult> => {
  return axios
    .get(home, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        client: Cookies.get("client") || "",
        uid: Cookies.get("uid") || "",
      },
      params: { content_or_date_cont: searchWord },
    })
    .then((res) => res.data);
};

export const getDiaies = (
  page: number,
  searchWord: undefined | string | Date
): Promise<IResult> => {
  return axios
    .get(home, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        client: Cookies.get("client") || "",
        uid: Cookies.get("uid") || "",
      },
      params: { content_or_date_cont: searchWord, page: page },
    })
    .then((res) => res.data);
};
