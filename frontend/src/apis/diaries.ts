import axios from 'axios';
import { diary } from '../urls/index';

interface IParams {
  date: string;
  content: string;
  picture?: {data:string,name: string};
}

interface ICurrentUserHeaders {
  'access-token': string;
  client: string;
  uid: string;
}

type TDiaryId = number;

export const createDiary = (currentUserHeaders: ICurrentUserHeaders, params: IParams): Promise<any> => {
  return axios.post(diary,
    {
      'access-token': currentUserHeaders['access-token'],
      client: currentUserHeaders.client,
      uid: currentUserHeaders.uid,
      date: params.date,
      content: params.content,
      picture: params.picture? {data: params.picture!.data, name: params.picture!.name} : null,
    })
    .then(res => res.data);
};

export const deleteDiary = (currentUserHeaders: ICurrentUserHeaders, page: number, diaryId: TDiaryId): Promise<any> => {
  return axios.delete(`${diary}/${diaryId}`,
  {
    headers: currentUserHeaders,
    data: {page: page},
  })
  .then(res => res.data);
}