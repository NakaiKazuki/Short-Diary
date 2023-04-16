import axios from "axios";
import { diary, photoGallery } from "../urls";

// helpers
import { setHeaders } from "../helpers";
// types
import {
  IDiaryParams as IParams,
  IDiariesResult as IResult,
  IPhotoGalleryResult,
} from "../types/apis";

export const createDiary = (params: IParams): Promise<IResult> => {
  const picture = params.picture && {
    data: params.picture.data,
    name: params.picture.name,
  };
  return axios
    .post(
      diary,
      {
        date: params.date,
        tag_list: params.tag_list ?? undefined,
        content: params.content,
        movie_source: params.movie_source || undefined,
        picture: picture,
      },
      {
        headers: setHeaders(),
      }
    )
    .then((res) => res.data);
};

export const updateDiary = (
  params: IParams,
  page: number,
  diaryId: number | undefined
): Promise<IResult> => {
  const picture = params.picture && {
    data: params.picture.data,
    name: params.picture.name,
  };
  return axios
    .patch(
      `${diary}/${diaryId}`,
      {
        date: params.date,
        tag_list: params.tag_list ?? undefined,
        content: params.content,
        movie_source: params.movie_source ?? undefined,
        picture: picture,
        page: page,
      },
      {
        headers: setHeaders(),
      }
    )
    .then((res) => res.data);
};

export const deleteDiary = (
  page: number,
  diaryId: number
): Promise<IResult> => {
  return axios
    .delete(`${diary}/${diaryId}`, {
      headers: setHeaders(),
      data: { page: page },
    })
    .then((res) => res.data);
};

export const fetchPhotoGallery = (): Promise<IPhotoGalleryResult> => {
  return axios
    .get(photoGallery, {
      headers: setHeaders(),
    })
    .then((res) => res.data);
};
