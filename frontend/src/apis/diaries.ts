import axios from 'axios';
import { postDiary } from '../urls/index';

interface IParams {
  date: string;
  content: string;
  picture?: string | undefined;
}

interface ICurrentUserHeaders {
  "access-token": string;
  client: string;
  uid: string;
}

export const createDiary = (currentUserHeaders: ICurrentUserHeaders, params: IParams):Promise<any> => {
  return axios.post(postDiary,
    {
      headers: currentUserHeaders
      // data:{
      //   date: params.date,
      //   content: params.content,
      //   picture: params.picture,
      // }
    })
    .catch(e => { throw e; })
};