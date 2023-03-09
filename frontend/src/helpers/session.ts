// 型

interface IUser {
  id: number;
  name: string;
  email: string;
  // image: string | undefined;
}

// ユーザがログインしていたらtrueを返す
export const isLoggedIn = (user: IUser | undefined): boolean => user != null;
