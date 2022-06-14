import { createContext, useState, FC } from "react";

// 型

interface IMessageContext {
  message: string | undefined;
  setMessage: React.Dispatch<React.SetStateAction<any>>;
}

export const MessageContext = createContext({} as IMessageContext);

export const MessageProvider: FC<any> = ({ children }): JSX.Element => {
  const [message, setMessage] = useState(undefined);

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
