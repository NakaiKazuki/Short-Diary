import { createContext, useState, FC } from "react";

// 型
interface IContactContext {
  open: boolean;
  setOpenContact: React.Dispatch<React.SetStateAction<any>>;
}

export const ContactContext = createContext({} as IContactContext);

export const ContactProvider: FC<any> = ({ children }): JSX.Element => {
  const [open, setOpenContact] = useState(false);

  return (
    <ContactContext.Provider value={{ open, setOpenContact }}>
      {children}
    </ContactContext.Provider>
  );
};
