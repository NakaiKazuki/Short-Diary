import { createContext, useState, FC, ReactNode } from "react";

// types
import { IContactContext as IContext } from "../types/contexts";

export const ContactContext = createContext({} as IContext);

export const ContactProvider: FC<{
  children: ReactNode;
}> = ({ children }): JSX.Element => {
  const [open, setOpenContact] = useState(false);

  return (
    <ContactContext.Provider value={{ open, setOpenContact }}>
      {children}
    </ContactContext.Provider>
  );
};
