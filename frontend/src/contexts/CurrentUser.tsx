import { createContext,useState,VFC } from 'react';

interface IHeaders {
  'access-token': string;
  client: string;
  uid: string;
}

interface IData {
  id: number;
  name: string;
  email: string;
}

interface ICurrentUser {
  id: number;
  data: IData;
  headers: IHeaders;
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