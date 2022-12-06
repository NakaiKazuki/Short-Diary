import { createContext, useState, FC } from "react";

// 型

interface IMessageProps {
  children: React.ReactNode;
}

interface IMessageContext {
  message: string | undefined;
  setMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const MessageContext = createContext({} as IMessageContext);

export const MessageProvider: FC<IMessageProps> = ({
  children,
}): JSX.Element => {
  const [message, setMessage] = useState<string | undefined>(undefined);

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
