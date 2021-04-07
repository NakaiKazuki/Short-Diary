import axios from 'axios';
import { postDiary } from '../urls/index';

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

export const createDiary = (currentUserHeaders: ICurrentUserHeaders, params: IParams):Promise<any> => {
  return axios.post(postDiary,
    {
      'access-token': currentUserHeaders['access-token'],
      client: currentUserHeaders.client,
      uid: currentUserHeaders.uid,
      date: params.date,
      content: params.content,
      picture: params.picture? {data: params.picture!.data, name: params.picture!.name} : null,
    })
};