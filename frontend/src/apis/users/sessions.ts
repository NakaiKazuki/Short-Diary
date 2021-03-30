import axios from 'axios';
import { signIn,signOut,guestSignIn } from '../../urls/index';

interface IParams {
  email: string;
  password: string;
}

interface IUserHeader {
  accessToken: string;
  client: string;
  uid: string;
}

export const createSession = (params: IParams) => {
  return axios.post(signIn,
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
  return axios.delete(signOut,
    {
      headers: userHeaders,
    }
    )
    .then(res => {
      return res;
    })
    .catch(e => { throw e; })
};

export const newGuestSession = () => {
  return axios.post(guestSignIn)
    .then(res => {
      return res;
    })
    .catch(e => { throw e; })
};