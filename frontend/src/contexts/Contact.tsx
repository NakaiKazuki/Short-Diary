import { createContext, useState, FC } from "react";

// 型
interface IContactProps {
  children: React.ReactNode;
}

interface IContactContext {
  open: boolean;
  setOpenContact: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContactContext = createContext({} as IContactContext);

export const ContactProvider: FC<IContactProps> = ({
  children,
}): JSX.Element => {
  const [open, setOpenContact] = useState(false);

  return (
    <ContactContext.Provider value={{ open, setOpenContact }}>
      {children}
    </ContactContext.Provider>
  );
};
