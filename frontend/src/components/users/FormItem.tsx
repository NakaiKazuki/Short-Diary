import { FC } from "react";
import { Controller } from "react-hook-form";
import { TextField, InputLabel } from "@mui/material";
import styled from "styled-components";

// types
import { IFormItemProps as IProps } from "../../types/components/users";

// css
const FormItemWrapper = styled.div`
  margin-top: 1rem;
  `;

const ErrorMessage = styled.p`
  margin: 0.6rem auto;
  color: red;
  font-size: 0.9rem;
  overflow-wrap: break-word;
  height:5rem;
`;

export const FormItem: FC<IProps> = ({ formInfo, control }) => {
  return (
    <InputLabel>
      <FormItemWrapper data-testid={`FormItem-${formInfo.nameAttribute}`}>
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
              type={formInfo.typeAttribute}
              label={formInfo.formLabel}
              autoFocus={formInfo.autoFocus}
              autoComplete={formInfo.autoComplete}
              fullWidth
              inputProps={{
                "data-testid": `${formInfo.nameAttribute}Area`,
              }}
            />
          )}
        />
      </FormItemWrapper>
    </InputLabel>
  );
};
