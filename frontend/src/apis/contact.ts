import axios from "axios";
import { contact } from "../urls";

interface IParams {
  name: string;
  email: string;
  overView: string | undefined;
  content: string;
}

interface IReturnData {
  message: string;
}

export const postContact = (params: IParams): Promise<IReturnData> => {
  return axios
    .post(contact, {
      name: params.name,
      email: params.email,
      over_view: params.overView ? params.overView : "無題",
      content: params.content,
    })
    .then((res) => res.data);
};
