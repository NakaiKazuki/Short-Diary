// 型
interface IUserHeaders {
  'access-token': string;
  client: string;
  uid: string;
}

interface IUserData {
  id: number;
  name: string;
  email: string;
  // image: string | null; // 使うようになったらコメントアウト
}

interface IUser {
  data: IUserData;
  headers: IUserHeaders;
}

// ユーザがログインしていたらtrueを返す
export const isLoggedIn = (user: IUser | undefined): boolean =>
  user != null;
;