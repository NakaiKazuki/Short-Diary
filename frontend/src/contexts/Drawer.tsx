import { createContext, useState, FC } from "react";

// 型

interface IDrawerContext {
  open: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<any>>;
}

export const DrawerContext = createContext({} as IDrawerContext);

export const DrawerProvider: FC<any> = ({ children }): JSX.Element => {
  const [open, setOpenDrawer] = useState(false);

  return (
    <DrawerContext.Provider value={{ open, setOpenDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};
