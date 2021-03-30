interface IHeader {
  accessToken: string;
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

export const isSignedIn = (currentUser: ICurrentUser | undefined) :boolean => {
  return  currentUser?.headers != null;
};