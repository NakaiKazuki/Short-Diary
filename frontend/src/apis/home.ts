import axios from 'axios';
import { home } from '../urls/index';

interface ICurrentUserHeaders {
  "access-token": string;
  client: string;
  uid: string;
}

export const fetchHome = (currentUserHeaders: ICurrentUserHeaders): Promise<any> => {
  return axios.get(home,{
    headers: currentUserHeaders
  })
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}