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

export const CurrentPassword: FC<IProps> = ({
  control,
  autoFocus,
  resultErrors,
  errors,
}) => {
  return (
    <InputLabel sx={{ whiteSpace: "unset" }}>
      <Item data-testid="FormItem-current_password">
        {errors && (
          <ErrorMessage data-testid="current_passwordErrorMessage">
            現在使用中のパスワードを入力してください。
          </ErrorMessage>
        )}
        {resultErrors?.map((message: string, index: number) => (
          <ErrorMessage
            key={`current_password-${index}`}
            data-testid="current_passwordResultError"
          >
            {`使用中のパスワード${message}`}
          </ErrorMessage>
        ))}

        <Controller
          name="current_password"
          control={control}
          rules={{ required: true, minLength: 6, maxLength: 128 }}
          defaultValue=""
          shouldUnregister
          render={({ field }) => (
            <TextField
              {...field}
              error={isError(errors || resultErrors)}
              type="password"
              label={
                <FormLabel name="現在使用中のパスワード" required={true} />
              }
              autoFocus={autoFocus}
              autoComplete="current-password"
              fullWidth
              sx={{ backgroundColor: "white" }}
              inputProps={{
                "data-testid": "current_passwordArea",
              }}
            />
          )}
        />
      </Item>
    </InputLabel>
  );
};
