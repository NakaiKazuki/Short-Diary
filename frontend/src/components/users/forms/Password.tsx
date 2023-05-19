import { FC } from "react";
import { Controller } from "react-hook-form";
import { TextField, InputLabel } from "@mui/material";

// helpers
import { isError } from "../../../helpers";

// types
import { IBaseProps as IProps } from "../../../types/components/users/forms";

// components
import { FormLabel } from "./FormLabel";

// css
import { Item, ErrorMessage } from "./style";

export const Password: FC<IProps> = ({
  control,
  autoFocus,
  resultErrors,
  errors,
  required,
}) => {
  return (
    <InputLabel sx={{ whiteSpace: "unset" }}>
      <Item data-testid="FormItem-password">
        {errors && (
          <ErrorMessage data-testid="passwordErrorMessage">
            6文字以上128文字以内で入力してください。
          </ErrorMessage>
        )}
        {resultErrors?.map((message: string, index: number) => (
          <ErrorMessage
            key={`password-${index}`}
            data-testid="passwordResultError"
          >
            {`パスワード${message}`}
          </ErrorMessage>
        ))}

        <Controller
          name="password"
          control={control}
          rules={{
            required: required,
            minLength: 6,
            maxLength: 128,
            pattern: /^[^\s\t]+$/,
          }}
          defaultValue=""
          shouldUnregister
          render={({ field }) => (
            <TextField
              {...field}
              error={isError(errors || resultErrors)}
              type="password"
              label={<FormLabel name="パスワード" required={required} />}
              autoFocus={autoFocus}
              autoComplete="new-password"
              fullWidth
              sx={{ backgroundColor: "white" }}
              inputProps={{
                "data-testid": "passwordArea",
              }}
            />
          )}
        />
      </Item>
    </InputLabel>
  );
};
