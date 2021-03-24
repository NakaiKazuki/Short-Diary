import axios from 'axios';
import { home } from '../urls/index';

export const fetchHome = () => {
  return axios.get(home)
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}
