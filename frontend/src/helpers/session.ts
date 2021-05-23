// 型
interface IHeaders {
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
  headers: IHeaders;
}

// ユーザがログインしていたらtrueを返す
export const isLoggedIn = (user: IUser | undefined): boolean =>
  user != null;
;