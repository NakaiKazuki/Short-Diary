import { createContext, useState, FC } from "react";

// types
import { IDrawerContext as IContext } from "../types/contexts";

export const DrawerContext = createContext({} as IContext);

export const DrawerProvider: FC<{
  children: React.ReactNode;
}> = ({ children }): JSX.Element => {
  const [open, setOpenDrawer] = useState(false);

  return (
    <DrawerContext.Provider value={{ open, setOpenDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};
