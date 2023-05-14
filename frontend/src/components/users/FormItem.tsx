import { FC } from "react";
import { Controller } from "react-hook-form";
import { TextField, InputLabel } from "@mui/material";
import styled from "styled-components";

// helpers
import { isError } from "../../helpers";
// types
import { IFormItemProps as IProps } from "../../types/components/users";
// css
const Item = styled.div`
  margin-top: 1rem;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin: 1rem auto;
  opacity: 0.8;
  overflow-wrap: break-word;
  padding: 0.5rem;
`;

export const FormItem: FC<IProps> = ({ formInfo, control }) => {
  return (
    <InputLabel sx={{ whiteSpace: "unset" }}>
      <Item data-testid={`FormItem-${formInfo.nameAttribute}`}>
        {formInfo.errorsProperty && (
          <ErrorMessage data-testid={`${formInfo.nameAttribute}ErrorMessage`}>
            {formInfo.errorMessage}
          </ErrorMessage>
        )}
        {formInfo.resultErrorProperty?.map((message: string, index: number) => (
          <ErrorMessage
            key={`${formInfo.nameAttribute}-${index}`}
            data-testid={`${formInfo.nameAttribute}ResultError`}
          >
            {`${formInfo.apiMessagePropertyName}${message}`}
          </ErrorMessage>
        ))}

        <Controller
          name={formInfo.nameAttribute}
          control={control}
          rules={formInfo.rules}
          defaultValue={formInfo.defaultValue}
          shouldUnregister
          render={({ field }) => (
            <TextField
              {...field}
              error={isError(
                formInfo.errorsProperty || formInfo.resultErrorProperty
              )}
              type={formInfo.typeAttribute}
              label={formInfo.formLabel}
              autoFocus={formInfo.autoFocus}
              autoComplete={formInfo.autoComplete}
              fullWidth
              sx={{ backgroundColor: "white" }}
              inputProps={{
                "data-testid": `${formInfo.nameAttribute}Area`,
              }}
            />
          )}
        />
      </Item>
    </InputLabel>
  );
};
