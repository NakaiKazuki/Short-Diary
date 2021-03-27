import axios from 'axios';
import { registration} from '../../urls/index';

interface ParamsProps {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface DataProps {
  id: number;
  provider: string;
  uid: string;
  allow_password_change: boolean;
  name: string;
  email: string;
  image: string | null;
  created_at: string;
  updated_at: string;
}

interface ErrorDataProps {
  name?: Array<string>;
  email?: Array<string>;
  password?: Array<string>;
  password_confirmation?: Array<string>;
  full_messages: Array<string>;
}

interface ErrorProps {
  response:{
    status: number;
    data: ErrorDataProps;
  }
}
export const postRegistration = (params:ParamsProps):Promise<DataProps | ErrorProps> => {
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