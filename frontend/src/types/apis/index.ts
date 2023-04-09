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

export interface IContactParams {
  name: string;
  email: string;
  overView: string | undefined;
  content: string;
}

export interface IContactResult {
  message: string;
}

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
