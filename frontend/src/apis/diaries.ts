import axios from "axios";
import { diary } from "../urls";

interface IParams {
  date: string;
  tag_list: string| undefined;
  content: string;
  picture: { data: string; name: string }| undefined;
}

interface ICurrentUserHeaders {
  "access-token": string;
  client: string;
  uid: string;
}

type TDiaryId = number;

export const createDiary = (
  currentUserHeaders: ICurrentUserHeaders,
  params: IParams
): Promise<any> => {
  return axios
    .post(diary, {
      "access-token": currentUserHeaders["access-token"],
      client: currentUserHeaders.client,
      uid: currentUserHeaders.uid,
      date: params.date,
      tag_list: params.tag_list ? params.tag_list : null,
      content: params.content,
      picture: params.picture
        ? { data: params.picture!.data, name: params.picture!.name }
        : null,
    })
    .then((res) => res.data)
    .catch((e) => {
      throw e;
    });
};

export const updateDiary = (
  currentUserHeaders: ICurrentUserHeaders,
  params: IParams,
  page: number,
  diaryId: TDiaryId | undefined
): Promise<any> => {
  return axios
    .patch(`${diary}/${diaryId}`, {
      "access-token": currentUserHeaders["access-token"],
      client: currentUserHeaders.client,
      uid: currentUserHeaders.uid,
      date: params.date,
      tag_list: params.tag_list ? params.tag_list : null,
      content: params.content,
      picture: params.picture
        ? { data: params.picture!.data, name: params.picture!.name }
        : null,
      page: page,
    })
    .then((res) => res.data)
    .catch((e) => {
      throw e;
    });
};

export const deleteDiary = (
  currentUserHeaders: ICurrentUserHeaders,
  page: number,
  diaryId: TDiaryId
): Promise<any> => {
  return axios
    .delete(`${diary}/${diaryId}`, {
      headers: currentUserHeaders,
      data: { page: page },
    })
    .then((res) => res.data)
    .catch((e) => {
      throw e;
    });
};
