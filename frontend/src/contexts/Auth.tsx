import { createContext, useState, FC } from "react";

// 型
interface IAuthProps {
  children: React.ReactNode;
}

interface IHeaders {
  "access-token": string;
  client: string;
  uid: string;
}

interface ICurrentUser {
  id: number;
  name: string;
  email: string;
}

interface IAuthContext {
  currentUser: ICurrentUser | undefined;
  setCurrentUser: React.Dispatch<
    React.SetStateAction<undefined | ICurrentUser>
  >;
  headers: IHeaders | undefined;
  setHeaders: React.Dispatch<React.SetStateAction<undefined | IHeaders>>;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider: FC<IAuthProps> = ({ children }): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<undefined | ICurrentUser>(
    undefined
  );
  const [headers, setHeaders] = useState<undefined | IHeaders>(undefined);
  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, headers, setHeaders }}
    >
      {children}
    </AuthContext.Provider>
  );
};
