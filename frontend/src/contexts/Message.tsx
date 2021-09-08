import { createContext, useState, VFC } from "react";

// 型
interface IMessage {
  message: string;
}

interface IMessageContext {
  message: IMessage | undefined;
  setMessage: React.Dispatch<React.SetStateAction<undefined>>;
}

export const MessageContext = createContext({} as IMessageContext);

export const MessageProvider: VFC<any> = ({ children }): JSX.Element => {
  const [message, setMessage] = useState(undefined);

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
