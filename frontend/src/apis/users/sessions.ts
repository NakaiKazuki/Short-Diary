import axios from 'axios';
import { sign_in,sign_out } from '../../urls/index';

interface IPostParams {
  email: string;
  password: string;
}

interface IUserHeader {
  accessToken: string;
  client: string;
  uid: string;
}

export const postSession = (params: IPostParams) => {
  return axios.post(sign_in,
    {
      email: params.email,
      password: params.password,
    }
    )
    .then(res => {
      return res;
    })
    .catch(e => { throw e; })
};

export const deleteSession = (userHeaders: IUserHeader) => {
  return axios.delete(sign_out,
    {
      headers: userHeaders,
    }
    )
    .then(res => {
      return res;
    })
    .catch(e => { throw e; })
};