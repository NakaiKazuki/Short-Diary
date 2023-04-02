// ユーザがログインしていたらtrueを返す
export const isLoggedIn = (user: ICurrentUser | undefined): boolean =>
  user != null;
