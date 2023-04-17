import { diary, photoGallery } from "../urls";

// helpers
import { axiosGet, axiosPost, axiosPatch, axiosDelete } from "../helpers";

// types
import {
  IDiaryParams as IParams,
  IDiariesResult as IResult,
  IPhotoGalleryResult,
  TData,
} from "../types/apis";

export const createDiary = (params: IParams): Promise<IResult> => {
  return axiosPost<IParams, TData<IResult>>(diary, params).then(
    (res) => res.data
  );
};

export const updateDiary = (
  params: IParams,
  page: number,
  diaryId: number | undefined
): Promise<IResult> => {
  const data = { ...params, page: page };
  return axiosPatch<IParams, TData<IResult>>(`${diary}/${diaryId}`, data).then(
    (res) => res.data
  );
};

export const deleteDiary = (
  page: number,
  diaryId: number
): Promise<IResult> => {
  const data = { page: page };
  return axiosDelete<{ page: number }, TData<IResult>>(
    `${diary}/${diaryId}`,
    data
  ).then((res) => res.data);
};

export const getPhotoGallery = (): Promise<IPhotoGalleryResult> => {
  return axiosGet<null, TData<IPhotoGalleryResult>>(photoGallery).then(
    (res) => res.data
  );
};
