import axios from "axios";
import { home } from "../urls";

// helpers
import { getCookie } from "../helpers";

// types
import { IDiariesResult as IResult } from "../types/apis";

export const fetchHome = (
  searchWord: undefined | string | Date = undefined
): Promise<IResult> => {
  return axios
    .get(home, {
      headers: {
        "access-token": getCookie("access-token"),
        client: getCookie("client"),
        uid: getCookie("uid"),
      },
      params: { q: { content_or_date_or_tags_name_cont: searchWord } },
    })
    .then((res) => res.data);
};

export const getDiaries = (
  page: number,
  searchWord: undefined | string | Date
): Promise<IResult> => {
  return axios
    .get(home, {
      headers: {
        "access-token": getCookie("access-token"),
        client: getCookie("client"),
        uid: getCookie("uid"),
      },

      params: {
        q: { content_or_date_or_tags_name_cont: searchWord },
        page: page,
      },
    })
    .then((res) => res.data);
};
