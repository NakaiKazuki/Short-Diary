import { MouseEvent } from "react";
import { FieldError, Control } from "react-hook-form";

interface IRurles {
  required?: boolean;
  maxLength: number;
  minLength?: number;
}

interface IFormInfo {
  formLabel: string;
  errorsProperty: FieldError | undefined;
  errorMessage: string;
  resultErrorProperty: Array<string> | undefined;
  apiMessagePropertyName: string;
  nameAttribute:
    | "name"
    | "email"
    | "password"
    | "password_confirmation"
    | "current_password";
  typeAttribute: string;
  defaultValue: string;
  autoComplete: string;
  autoFocus: boolean;
  rules: IRurles;
}

interface IFormValues {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  current_password: string;
}

export interface IFormItemProps {
  formInfo: IFormInfo;
  control: Control<IFormValues>;
}

export interface ILink {
  url: string;
  text: string;
}

export interface ILinks {
  linkInfo: Array<ILink>;
}

export interface IFormSubmit {
  isDisabled: boolean;
  onSubmitText: string;
}

export interface IUserMenuProps {
  anchorEl: HTMLElement | null;
  userName: string;
  onMenuOpen(e: MouseEvent<HTMLElement>): void;
  onMenuClose(): void;
  onSignOut(): void;
}
