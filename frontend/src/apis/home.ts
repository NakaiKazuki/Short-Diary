import axios from 'axios';
import { home , registration} from '../urls/index'
interface ParamsProps {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
export const fetchHome = () => {
  return axios.get(home)
  .then(res => {
    return res.data
  })
  .catch((e) => console.error(e))
}

export const postRegistration = (params:ParamsProps) => {
  return axios.post(registration,
    {
      name: params.name,
      email: params.email,
      password: params.password,
      password_confirmation: params.password_confirmation,
    }
    )
    .then(res => {
      return res.data;
    })
    .catch(e => {throw e; })
};
