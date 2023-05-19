import { MouseEvent } from "react";
export interface IUserMenuProps {
  anchorEl: HTMLElement | null;
  userName: string;
  onMenuOpen(e: MouseEvent<HTMLElement>): void;
  onMenuClose(): void;
  onSignOut(): void;
}

export interface ISignUpDialogProps {
  isOpen: boolean;
  handleClose(): void;
}
