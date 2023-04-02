import { createContext, useState, FC, ReactNode } from "react";

// types
import { IAuthContext as IContext } from "../types/contexts";

export const AuthContext = createContext({} as IContext);

export const AuthProvider: FC<{
  children: ReactNode;
}> = ({ children }): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<undefined | ICurrentUser>(
    undefined
  );

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
