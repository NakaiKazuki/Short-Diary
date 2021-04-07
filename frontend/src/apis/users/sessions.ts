import axios from 'axios';
import {
  signIn,
  signOut,
  guestSignIn } from '../../urls/index';

interface IParams {
  email: string;
  password: string;
}

interface ICurrentUserHeaders {
  'access-token': string;
  client: string;
  uid: string;
}

export const createSession = (params: IParams) => {
  return axios.post(signIn,
    {
      email: params.email,
      password: params.password,
    })
    .catch(e => { throw e; })
};

export const deleteSession = (currentUserHeaders: ICurrentUserHeaders) => {
  return axios.delete(signOut,
    {
      headers: currentUserHeaders,
    })
    .catch(e => { throw e; })
};

export const newGuestSession = () => {
  return axios.post(guestSignIn)
  .catch(e => { throw e; })
};