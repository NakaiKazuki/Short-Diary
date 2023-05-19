import { FieldError, Control } from "react-hook-form";

interface IFormValues {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  current_password: string;
}

export interface IBaseProps {
  control: Control<IFormValues>;
  autoFocus: boolean;
  resultErrors: Array<string> | undefined;
  errors: FieldError | undefined;
  required: boolean;
}

export interface ICustomProps extends IBaseProps {
  defaultValue: string;
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
