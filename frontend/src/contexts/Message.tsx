import { createContext, useState, FC, ReactNode } from "react";

// types
import { IMessageContext as IContext } from "../types/contexts";

export const MessageContext = createContext({} as IContext);

export const MessageProvider: FC<{
  children: ReactNode;
}> = ({ children }): JSX.Element => {
  const [message, setMessage] = useState<string | undefined>(undefined);

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
