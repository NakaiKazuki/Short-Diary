// 型
interface IHeaders {
  "access-token": string;
  client: string;
  uid: string;
}

interface IUser {
  id: number;
  name: string;
  email: string;
  // image: string | undefined;
}

// ユーザがログインしていたらtrueを返す
export const isLoggedIn = (
  user: IUser | undefined,
  headers: IHeaders | undefined
): boolean => user != null && headers != null;
