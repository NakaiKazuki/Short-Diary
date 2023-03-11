interface IApiErrors {
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

export interface IContactFormValues {
  name: string;
  email: string;
  overView: string;
  content: string;
}

export interface IContactApiErrors {
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
  apiErrors: IApiErrors | undefined;
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

export type TPicture = Array<{ data: string; name: string }>;

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
  items: Array<IItemsProps> | [];
  fetchState: "INITIAL" | "LOADING" | "OK";
}

export interface IUsersApiErrors {
  name?: Array<string>;
  email?: Array<string>;
  password?: Array<string>;
  password_confirmation?: Array<string>;

  current_password?: Array<string>;
  guest?: Array<string>;
}

// エラーメッセージ
interface IApiErrors {
  name?: Array<string>;
  password?: Array<string>;
  password_confirmation?: Array<string>;
  current_password?: Array<string>;
  guest?: Array<string>;
}
