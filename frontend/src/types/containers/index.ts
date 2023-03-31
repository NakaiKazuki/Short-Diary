import { FieldError } from "react-hook-form";
interface IResultErrors {
  date?: Array<string>;
  tag_list?: Array<string>;
  content?: Array<string>;
  picture?: Array<string>;
  movie_source?: Array<string>;
}

interface IPagy {
  page: number;
  pages: number;
}

interface IItemsProps {
  original: string;
  originalHeight: number;
  originalWidth: number;
}

// エラーメッセージ
interface IResultErrors {
  name?: Array<string>;
  password?: Array<string>;
  password_confirmation?: Array<string>;
  current_password?: Array<string>;
  guest?: Array<string>;
}

interface IRurles {
  required: boolean;
  minLength?: number;
  maxLength: number;
}

interface IObject {
  formLabel: string;
  errorsProperty: FieldError | undefined;
  errorMessage: string;
  resultErrorProperty: Array<string> | undefined;
  apiMessagePropertyName: string;
  nameAttribute: "name" | "email" | "password" | "password_confirmation";
  typeAttribute: string;
  defaultValue: string;
  autoComplete: string;
  autoFocus: boolean;
  rules: IRurles;
}

interface IUserEditRurles {
  required?: boolean;
  minLength?: number;
  maxLength: number;
}

interface IUserEditObject {
  formLabel: string;
  errorsProperty: FieldError | undefined;
  errorMessage: string;
  resultErrorProperty: Array<string> | undefined;
  apiMessagePropertyName: string;
  nameAttribute:
    | "name"
    | "email"
    | "password"
    | "password_confirmation"
    | "current_password";
  typeAttribute: string;
  defaultValue: string;
  autoComplete: string;
  autoFocus: boolean;
  rules: IUserEditRurles;
}

export interface IContactFormValues {
  name: string;
  email: string;
  overView: string;
  content: string;
}

export interface IContactResultErrors {
  name?: Array<string>;
  email?: Array<string>;
  over_view?: Array<string>;
  content?: Array<string>;
}

export interface IUsersFormValues {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  current_password: string;
}

export interface ILoginHomeInitialState {
  anchorEl: HTMLElement | null;
  resultErrors: IResultErrors | undefined;
  diaries: Array<IDiary> | undefined;
  fetchState: "INITIAL" | "LOADING" | "OK";
  pagy: IPagy | undefined;
  selectedDate: null | Date;
  selectedDiary: IDiary | null;
  searchWord: string | undefined;
  isOpenDiaryCreateDialog: boolean;
  isOpenDiaryDialog: boolean;
  isOpenDiaryEdit: boolean;
  isOpenConfirmDialog: boolean;
  isOpenDrawer: boolean;
}

export interface IDiary {
  id: number;
  date: string;
  content: string;
  picture_url: string | undefined;
  tag_list: Array<string | undefined>;
  movie_source: string | undefined;
  user_id: number;
}

export type TPicture = Array<{ data: string; name: string }>;
export interface ILoginHomeFormValues {
  date: string;
  tag_list: string | undefined;
  content: string;
  picture: TPicture | undefined;
  movie_source: string;
  searchWord: string | undefined;
}

export interface ISearchFormValue {
  searchWord: string | undefined;
}

export interface IFile extends File {
  data: string | ArrayBuffer | null;
}

export interface IPhotoGalleryInitialState {
  items: Array<IItemsProps> | [];
  fetchState: "INITIAL" | "LOADING" | "OK";
}

export interface IUsersResultErrors {
  name?: Array<string>;
  email?: Array<string>;
  password?: Array<string>;
  password_confirmation?: Array<string>;

  current_password?: Array<string>;
  guest?: Array<string>;
}

export interface IErrors {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  current_password: string;
}
export interface IForm {
  name: IObject;
  email: IObject;
  password: IObject;
  password_confirmation: IObject;
  current_password: IObject;
}

export type TLinks = [
  {
    url: string;
    text: string;
  }
];
export interface IUserEditForm {
  name: IUserEditObject;
  email: IUserEditObject;
  password: IUserEditObject;
  password_confirmation: IUserEditObject;
  current_password: IUserEditObject;
}
