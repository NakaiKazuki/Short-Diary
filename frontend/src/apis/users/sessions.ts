import axios from 'axios';
import { session } from '../../urls/index';

interface Params {
  email: string;
  password: string;
}

export const postSession = (params: Params) => {
  return axios.post(session,
    {
      email: params.email,
      password: params.password,
    }
    )
    .then(res => {
      return res.data;
    })
    .catch(e => { throw e; })
};