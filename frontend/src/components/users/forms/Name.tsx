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

export const Name: FC<IProps> = ({
  control,
  autoFocus,
  defaultValue,
  resultErrors,
  errors,
  required,
}) => {
  return (
    <InputLabel sx={{ whiteSpace: "unset" }}>
      <Item data-testid="FormItem-name">
        {errors && (
          <ErrorMessage data-testid="nameErrorMessage">
            1文字以上、50文字以内で入力してください
          </ErrorMessage>
        )}
        {resultErrors?.map((message: string, index: number) => (
          <ErrorMessage key={`name-${index}`} data-testid="nameResultError">
            {`名前${message}`}
          </ErrorMessage>
        ))}

        <Controller
          name="name"
          control={control}
          rules={{ required: required, maxLength: 50 }}
          defaultValue={defaultValue}
          shouldUnregister
          render={({ field }) => (
            <TextField
              {...field}
              error={isError(errors || resultErrors)}
              type="text"
              label={<FormLabel name="Name" required={required} />}
              autoFocus={autoFocus}
              autoComplete="username"
              fullWidth
              sx={{ backgroundColor: "white" }}
              inputProps={{
                "data-testid": "nameArea",
              }}
            />
          )}
        />
      </Item>
    </InputLabel>
  );
};
