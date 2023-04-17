import { home } from "../urls";

// helpers
import { axiosGet } from "../helpers";

// types
import {
  IDiariesResult as IResult,
  TSearchWord,
  IHomeData,
  TData,
} from "../types/apis";

export const getHome = (searchWord?: TSearchWord): Promise<IResult> => {
  const data: IHomeData = {
    params: { q: { content_or_date_or_tags_name_cont: searchWord } },
  };

  return axiosGet<IHomeData, TData<IResult>>(home, data).then(
    (res) => res.data
  );
};

export const getDiaries = (
  page: number,
  searchWord: TSearchWord
): Promise<IResult> => {
  const data: IHomeData = {
    params: {
      q: { content_or_date_or_tags_name_cont: searchWord },
      page: page,
    },
  };

  return axiosGet<IHomeData, TData<IResult>>(home, data).then(
    (res) => res.data
  );
};
