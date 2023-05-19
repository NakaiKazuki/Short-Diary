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

export const PasswordConfirmation: FC<IProps> = ({
  control,
  autoFocus,
  resultErrors,
  errors,
  required,
}) => {
  return (
    <InputLabel sx={{ whiteSpace: "unset" }}>
      <Item data-testid="FormItem-password_confirmation">
        {errors && (
          <ErrorMessage data-testid="password_confirmationErrorMessage">
            パスワードと同じ内容を入力してください。
          </ErrorMessage>
        )}
        {resultErrors?.map((message: string, index: number) => (
          <ErrorMessage
            key={`password_confirmation-${index}`}
            data-testid="password_confirmationResultError"
          >
            {`確認用パスワード${message}`}
          </ErrorMessage>
        ))}

        <Controller
          name="password_confirmation"
          control={control}
          rules={{ required: required, minLength: 6, maxLength: 128 }}
          defaultValue=""
          shouldUnregister
          render={({ field }) => (
            <TextField
              {...field}
              error={isError(errors || resultErrors)}
              type="password"
              label={<FormLabel name="確認用パスワード" required={required} />}
              autoFocus={autoFocus}
              autoComplete="new-password"
              fullWidth
              sx={{ backgroundColor: "white" }}
              inputProps={{
                "data-testid": "password_confirmationArea",
              }}
            />
          )}
        />
      </Item>
    </InputLabel>
  );
};
