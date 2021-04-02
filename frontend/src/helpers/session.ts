// 型
interface ICurrentUserHeaders {
  'access-token': string;
  client: string;
  uid: string;
}

interface ICurrentUserData {
  id: number;
  name: string;
  email: string;
  // image: string | null; // 使うようになったらコメントアウト
}

interface ICurrentUser {
  data: ICurrentUserData;
  headers: ICurrentUserHeaders;
}

// ユーザがログインしていたらtrueを返す (ログインしていないと持っていない情報で判定している)
export const isSignedIn = (currentUser: ICurrentUser | undefined): boolean =>
  currentUser?.headers != null;
;