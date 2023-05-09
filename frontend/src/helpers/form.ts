import { FieldError } from "react-hook-form";
export const isError = (errors: string[] | FieldError | undefined) =>
  Boolean(errors);
