import axios from "axios";
import { diary, photoGallery } from "../urls";

interface IParams {
  date: string;
  tag_list: string | undefined;
  content: string;
  movie_source: string | undefined;
  picture: { data: string; name: string } | undefined;
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
      ...currentUserHeaders,
      date: params.date,
      tag_list: params.tag_list ? params.tag_list : null,
      content: params.content,
      movie_source: params.movie_source ? params.movie_source : null,
      picture: params.picture
        ? { data: params.picture!.data, name: params.picture!.name }
        : null,
    })
    .then((res) => res.data);
};

export const updateDiary = (
  currentUserHeaders: ICurrentUserHeaders,
  params: IParams,
  page: number,
  diaryId: TDiaryId | undefined
): Promise<any> => {
  return axios
    .patch(`${diary}/${diaryId}`, {
      ...currentUserHeaders,
      date: params.date,
      tag_list: params.tag_list ? params.tag_list : null,
      content: params.content,
      movie_source: params.movie_source ? params.movie_source : null,
      picture: params.picture
        ? { data: params.picture!.data, name: params.picture!.name }
        : null,
      page: page,
    })
    .then((res) => res.data);
};

export const deleteDiary = (
  currentUserHeaders: ICurrentUserHeaders,
  page: number,
  diaryId: TDiaryId
): Promise<any> => {
  return axios
    .delete(`${diary}/${diaryId}`, {
      headers: {...currentUserHeaders},
      data: { page: page },
    })
    .then((res) => res.data);
};

export const fetchPhotoGallery = (
  currentUserHeaders: ICurrentUserHeaders,
): Promise<any> => {
  return axios
    .get(photoGallery, {
      headers: {...currentUserHeaders},
    })
    .then((res) => res.data);
};
