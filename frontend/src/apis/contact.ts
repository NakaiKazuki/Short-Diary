import axios from "axios";
import { contact } from "../urls";

// types
import {
  IContactParams as IParams,
  IContactResult as IResult,
} from "../types/apis";

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
