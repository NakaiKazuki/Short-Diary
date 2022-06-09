import { createContext, useState, FC } from "react";

// 型
interface IHeaders {
  "access-token": string;
  client: string;
  uid: string;
}

interface IData {
  id: number;
  name: string;
  email: string;
}

interface ICurrentUser {
  data: IData;
  headers: IHeaders;
}

interface IAuthContext {
  currentUser: ICurrentUser | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<undefined>>;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider: FC<any> = ({ children }): JSX.Element => {
  const [currentUser, setCurrentUser] = useState(undefined);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
