export interface IAuthProviderProps {
  value: {
    currentUser: ICurrentUser | undefined;
    setCurrentUser: jest.Mock<React.Dispatch<React.SetStateAction<undefined>>>;
  };
}

export interface IContactProviderProps {
  value: {
    open: boolean;
    setOpenContact: jest.Mock<React.Dispatch<React.SetStateAction<boolean>>>;
  };
}

export interface IMessageProviderProps {
  value: {
    message: string | undefined;
    setMessage: jest.Mock<
      React.Dispatch<React.SetStateAction<string | undefined>>
    >;
  };
}
