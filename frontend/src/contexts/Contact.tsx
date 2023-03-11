import { createContext, useState, FC } from "react";

// types
import { IContactContext as IContext } from "../types/contexts";

export const ContactContext = createContext({} as IContext);

export const ContactProvider: FC<{
  children: React.ReactNode;
}> = ({ children }): JSX.Element => {
  const [open, setOpenContact] = useState(false);

  return (
    <ContactContext.Provider value={{ open, setOpenContact }}>
      {children}
    </ContactContext.Provider>
  );
};
