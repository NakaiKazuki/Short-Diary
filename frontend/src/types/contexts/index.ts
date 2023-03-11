export interface IAuthContext {
  currentUser: ICurrentUser | undefined;
  setCurrentUser: React.Dispatch<
    React.SetStateAction<undefined | ICurrentUser>
  >;
}

export interface IContactContext {
  open: boolean;
  setOpenContact: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IDrawerContext {
  open: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IMessageContext {
  message: string | undefined;
  setMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
}
