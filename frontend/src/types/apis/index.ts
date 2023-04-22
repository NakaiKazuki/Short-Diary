// User
export interface IUserParams {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  current_password: string;
}

export interface IUserResult {
  headers: IHeaders;
  data: { data: ICurrentUser };
}
export interface IGestResult {
  headers: IHeaders;
  data: ICurrentUser;
}

// Contact
export interface IContactParams {
  name: string;
  email: string;
  over_view: string;
  content: string;
}

export interface IContactResult {
  message: string;
}

// Diary
interface IItemsProps {
  original: string;
  originalHeight: number;
  originalWidth: number;
}

export interface IDiaryParams {
  date: string;
  tag_list: string | undefined;
  content: string;
  movie_source: string | undefined;
  picture: { data: string; name: string } | undefined;
}

export interface IDiariesResult {
  diaries: [
    {
      id: number;
      date: string;
      content: string;
      picture_url: string | undefined;
      tag_list: Array<string | undefined>;
      movie_source: string;
      user_id: number;
    }
  ];
  pagy: {
    page: number;
    pages: number;
  };
}

export interface IPhotoGalleryResult {
  items: Array<IItemsProps> | [];
  originalWidth: number;
}

// Home
export type TSearchWord = undefined | string | Date;

export interface IHomeData {
  params: {
    q: { content_or_date_or_tags_name_cont: TSearchWord };
    page?: number;
  };
}

// 共通
export type TAxiosPost = <T, R>(url: string, data?: T) => Promise<R>;
export type TAxiosGet = <T, R>(url: string, data?: T) => Promise<R>;
export type TAxiosPut = <T, R>(url: string, data: T) => Promise<R>;
export type TAxiosPatch = <T, R>(url: string, data: T) => Promise<R>;
export type TAxiosDelete = <T, R>(url: string, data?: T) => Promise<R>;

export type TData<D> = { data: D };
