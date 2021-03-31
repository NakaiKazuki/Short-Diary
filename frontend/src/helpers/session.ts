// apis
import { deleteSession } from '../apis/users/sessions';

// 型
interface IHeader {
  "access-token": string;
  client: string;
  uid: string;
}

interface IData {
  id: number;
  name: string;
  email: string;
  image: string | null;
}

interface ICurrentUser {
  data: IData;
  headers: IHeader;
}

// ユーザがログインしていたらtrueを返す (ログインしていないと持っていない情報で判定している)
export const isSignedIn = (currentUser: ICurrentUser | undefined): boolean =>
  currentUser?.headers != null;
;

// ユーザのログアウト処理
export const signOutHandler = (
  userHeaders: IHeader,
  fc: React.Dispatch<React.SetStateAction<any>>,
  history: any): void =>
{
  deleteSession(userHeaders)
  .then(() => {
    fc(undefined)
    history.push("/");
  })
  .catch(e => {
    throw e;
  });
};