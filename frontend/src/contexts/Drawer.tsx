import { createContext, useState, FC } from "react";

// 型
interface IDrawerProps {
  children: React.ReactNode;
}

interface IDrawerContext {
  open: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DrawerContext = createContext({} as IDrawerContext);

export const DrawerProvider: FC<IDrawerProps> = ({ children }): JSX.Element => {
  const [open, setOpenDrawer] = useState(false);

  return (
    <DrawerContext.Provider value={{ open, setOpenDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};
