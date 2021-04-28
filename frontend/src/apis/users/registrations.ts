import axios from 'axios';
import { registration} from '../../urls';

interface IParams {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const postRegistration = (params: IParams):Promise<any> => {
  return axios.post(registration,
    {
      name: params.name,
      email: params.email,
      password: params.password,
      password_confirmation: params.password_confirmation,
    })
    .catch(e => { throw e; })
};