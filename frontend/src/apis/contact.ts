import { contact } from "../urls";

// helpers
import { axiosPost } from "../helpers";

// types
import {
  IContactParams as IParams,
  IContactResult as IResult,
  TData,
} from "../types/apis";

export interface IContactParams {
  name: string;
  email: string;
  over_view: string;
  content: string;
}
export const postContact = (params: IContactParams): Promise<IResult> => {
  return axiosPost<IParams, TData<IResult>>(contact, params).then(
    (res) => res.data
  );
};
