import { createContext, useState, FC, ReactNode } from "react";

// types
import { IDrawerContext as IContext } from "../types/contexts";

export const DrawerContext = createContext({} as IContext);

export const DrawerProvider: FC<{
  children: ReactNode;
}> = ({ children }): JSX.Element => {
  const [open, setOpenDrawer] = useState(false);

  return (
    <DrawerContext.Provider value={{ open, setOpenDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};
