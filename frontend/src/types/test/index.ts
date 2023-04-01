import { Dispatch, SetStateAction } from "react";
export interface IAuthProviderProps {
  value: {
    currentUser: ICurrentUser | undefined;
    setCurrentUser: jest.Mock<Dispatch<SetStateAction<undefined>>>;
  };
}

export interface IContactProviderProps {
  value: {
    open: boolean;
    setOpenContact: jest.Mock<Dispatch<SetStateAction<boolean>>>;
  };
}

export interface IMessageProviderProps {
  value: {
    message: string | undefined;
    setMessage: jest.Mock<Dispatch<SetStateAction<string | undefined>>>;
  };
}

export type TLinks = [
  {
    url: string;
    text: string;
  }
];
