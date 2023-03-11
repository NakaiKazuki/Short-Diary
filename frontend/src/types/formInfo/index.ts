import { FieldError } from "react-hook-form";
interface IRurles {
  required: boolean;
  minLength?: number;
  maxLength: number;
}

interface IObject {
  formLabel: string;
  errorsProperty: FieldError | undefined;
  errorMessage: string;
  apiErrorProperty: Array<string> | undefined;
  apiMessagePropertyName: string;
  nameAttribute: "name" | "email" | "password" | "password_confirmation";
  typeAttribute: string;
  defaultValue: string;
  autoComplete: string;
  autoFocus: boolean;
  rules: IRurles;
}

interface IUserEditRurles {
  required?: boolean;
  minLength?: number;
  maxLength: number;
}

interface IUserEditObject {
  formLabel: string;
  errorsProperty: FieldError | undefined;
  errorMessage: string;
  apiErrorProperty: Array<string> | undefined;
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
  rules: IUserEditRurles;
}

export type TLinks = [
  {
    url: string;
    text: string;
  }
];

export interface IErrors {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  current_password: string;
}

export interface IApiErrors {
  name?: Array<string>;
  email?: Array<string>;
  password?: Array<string>;
  password_confirmation?: Array<string>;
  current_password?: Array<string>;
}

export interface IForm {
  name: IObject;
  email: IObject;
  password: IObject;
  password_confirmation: IObject;
  current_password: IObject;
}

export interface IUserEditForm {
  name: IUserEditObject;
  email: IUserEditObject;
  password: IUserEditObject;
  password_confirmation: IUserEditObject;
  current_password: IUserEditObject;
}
