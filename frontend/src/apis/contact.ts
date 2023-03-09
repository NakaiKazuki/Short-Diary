import axios from "axios";
import { contact } from "../urls";

interface IParams {
  name: string;
  email: string;
  overView: string | undefined;
  content: string;
}

interface IResult {
  message: string;
}

export const postContact = (params: IParams): Promise<IResult> => {
  return axios
    .post(contact, {
      name: params.name,
      email: params.email,
      over_view: params.overView ? params.overView : "無題",
      content: params.content,
    })
    .then((res) => res.data);
};
