import { createContext,useState,VFC } from 'react';

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

interface ICurrentUserContext {
  currentUser: ICurrentUser | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
};

export const CurrentUserContext = createContext({} as ICurrentUserContext );

export const CurrentUserProvider:VFC<any> = ({children}) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};