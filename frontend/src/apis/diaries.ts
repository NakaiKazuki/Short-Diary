import axios from "axios";
import Cookies from "js-cookie";
import { diary, photoGallery } from "../urls";

// types
import {
  IDiaryParams as IParams,
  IDiariesResult as IResult,
  IPhotoGalleryResult,
} from "../types/apis";

export const createDiary = (params: IParams): Promise<IResult> => {
  const picture = params.picture
    ? { data: params.picture.data, name: params.picture.name }
    : undefined;
  return axios
    .post(diary, {
      "access-token": Cookies.get("access-token") || "",
      client: Cookies.get("client") || "",
      uid: Cookies.get("uid") || "",
      date: params.date,
      tag_list: params.tag_list || undefined,
      content: params.content,
      movie_source: params.movie_source || undefined,
      picture: picture,
    })
    .then((res) => res.data);
};

export const updateDiary = (
  params: IParams,
  page: number,
  diaryId: number | undefined
): Promise<IResult> => {
  const picture = params.picture
    ? { data: params.picture.data, name: params.picture.name }
    : undefined;
  return axios
    .patch(`${diary}/${diaryId}`, {
      "access-token": Cookies.get("access-token") || "",
      client: Cookies.get("client") || "",
      uid: Cookies.get("uid") || "",
      date: params.date,
      tag_list: params.tag_list ? params.tag_list : undefined,
      content: params.content,
      movie_source: params.movie_source || undefined,
      picture: picture,
      page: page,
    })
    .then((res) => res.data);
};

export const deleteDiary = (
  page: number,
  diaryId: number
): Promise<IResult> => {
  return axios
    .delete(`${diary}/${diaryId}`, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        client: Cookies.get("client") || "",
        uid: Cookies.get("uid") || "",
      },
      data: { page: page },
    })
    .then((res) => res.data);
};

export const fetchPhotoGallery = (): Promise<IPhotoGalleryResult> => {
  return axios
    .get(photoGallery, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        client: Cookies.get("client") || "",
        uid: Cookies.get("uid") || "",
      },
    })
    .then((res) => res.data);
};
