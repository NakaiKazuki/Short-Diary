import axios from 'axios';
import { registration} from '../../urls/index';

interface ParamsProps {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
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
    .catch(e => { throw e; })
};