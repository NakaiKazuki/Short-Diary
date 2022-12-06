import axios from "axios";
import { diary, photoGallery } from "../urls";

interface IParams {
  date: string;
  tag_list: string | undefined;
  content: string;
  movie_source: string | undefined;
  picture: { data: string; name: string } | undefined;
}

interface IHeaders {
  "access-token": string;
  client: string;
  uid: string;
}

interface IReturnData {
  diaries: [
    {
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

interface IItemsProps {
  original: string;
  originalHeight: number;
  originalWidth: number;
}

interface IReturnPhotoGallery {
  items: Array<IItemsProps> | [];
  originalWidth: number;
}

export const createDiary = (
  headers: IHeaders,
  params: IParams
): Promise<IReturnData> => {
  const picture = params.picture
    ? { data: params.picture.data, name: params.picture.name }
    : undefined;
  return axios
    .post(diary, {
      ...headers,
      date: params.date,
      tag_list: params.tag_list ? params.tag_list : undefined,
      content: params.content,
      movie_source: params.movie_source ? params.movie_source : undefined,
      picture: picture,
    })
    .then((res) => res.data);
};

export const updateDiary = (
  headers: IHeaders,
  params: IParams,
  page: number,
  diaryId: number | undefined
): Promise<IReturnData> => {
  const picture = params.picture
    ? { data: params.picture.data, name: params.picture.name }
    : undefined;
  return axios
    .patch(`${diary}/${diaryId}`, {
      ...headers,
      date: params.date,
      tag_list: params.tag_list ? params.tag_list : undefined,
      content: params.content,
      movie_source: params.movie_source ? params.movie_source : undefined,
      picture: picture,
      page: page,
    })
    .then((res) => res.data);
};

export const deleteDiary = (
  headers: IHeaders,
  page: number,
  diaryId: number
): Promise<IReturnData> => {
  return axios
    .delete(`${diary}/${diaryId}`, {
      headers: { ...headers },
      data: { page: page },
    })
    .then((res) => res.data);
};

export const fetchPhotoGallery = (
  Headers: IHeaders
): Promise<IReturnPhotoGallery> => {
  return axios
    .get(photoGallery, {
      headers: { ...Headers },
    })
    .then((res) => res.data);
};
