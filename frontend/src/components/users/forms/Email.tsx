import { FC } from "react";
import { Controller } from "react-hook-form";
import { TextField, InputLabel } from "@mui/material";

// helpers
import { isError } from "../../../helpers";

// types
import { ICustomProps as IProps } from "../../../types/components/users/forms";

// components
import { FormLabel } from "./FormLabel";

// css
import { Item, ErrorMessage } from "./style";

export const Email: FC<IProps> = ({
  control,
  autoFocus,
  defaultValue,
  resultErrors,
  errors,
  required,
}) => {
  return (
    <InputLabel sx={{ whiteSpace: "unset" }}>
      <Item data-testid="FormItem-email">
        {errors && (
          <ErrorMessage data-testid="emailErrorMessage">
            255文字以内でメールアドレスを入力してください
          </ErrorMessage>
        )}
        {resultErrors?.map((message: string, index: number) => (
          <ErrorMessage key={`email-${index}`} data-testid="emailResultError">
            {`メールアドレス${message}`}
          </ErrorMessage>
        ))}

        <Controller
          name="email"
          control={control}
          rules={{
            required: required,
            maxLength: 255,
            pattern:
              /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
          }}
          defaultValue={defaultValue}
          shouldUnregister
          render={({ field }) => (
            <TextField
              {...field}
              error={isError(errors || resultErrors)}
              type="email"
              label={<FormLabel name="Email" required={required} />}
              autoFocus={autoFocus}
              autoComplete="email"
              fullWidth
              sx={{ backgroundColor: "white" }}
              inputProps={{
                "data-testid": "emailArea",
              }}
            />
          )}
        />
      </Item>
    </InputLabel>
  );
};
