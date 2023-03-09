import { createContext, useState, FC } from "react";

// 型
interface IAuthProps {
  children: React.ReactNode;
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
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthProvider: FC<IAuthProps> = ({ children }): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<undefined | ICurrentUser>(
    undefined
  );

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
