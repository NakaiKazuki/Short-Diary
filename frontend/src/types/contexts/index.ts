import { Dispatch, SetStateAction } from "react";
export interface IAuthContext {
  currentUser: ICurrentUser | undefined;
  setCurrentUser: Dispatch<SetStateAction<undefined | ICurrentUser>>;
}

export interface IContactContext {
  open: boolean;
  setOpenContact: Dispatch<SetStateAction<boolean>>;
}

export interface IDrawerContext {
  open: boolean;
  setOpenDrawer: Dispatch<SetStateAction<boolean>>;
}

export interface IMessageContext {
  message: string | undefined;
  setMessage: Dispatch<SetStateAction<string | undefined>>;
}
