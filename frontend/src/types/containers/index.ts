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

interface IItemProps {
  original: string;
}

interface IUserEditRurles {
  required?: boolean;
  minLength?: number;
  maxLength: number;
  pattern?: RegExp;
}

interface IUserEditObject {
  formLabel: JSX.Element | string;
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

export type TPicture = Array<{ data: string; name: string }>;
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

export interface ILogoutHomeInitialState {
  isDesktop: boolean;
  isAboutOpen: boolean;
  isSignUpOpen: boolean;
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
  items: Array<IItemProps> | [];
  fetchState: "INITIAL" | "LOADING" | "OK";
}

export interface IUsersResultErrors {
  name: Array<string> | undefined;
  email: Array<string> | undefined;
  password: Array<string> | undefined;
  password_confirmation: Array<string> | undefined;

  current_password: Array<string> | undefined;
  guest: Array<string> | undefined;
}

export interface IErrors {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  current_password: string;
}

export type TLinks = Array<{
  url: string;
  text: string;
}>;
export interface IUserEditForm {
  name: IUserEditObject;
  email: IUserEditObject;
  password: IUserEditObject;
  password_confirmation: IUserEditObject;
  current_password: IUserEditObject;
}
export interface HomeTopItemProps {
  url: string;
  position: [x: number, y: number, z: number];
}
