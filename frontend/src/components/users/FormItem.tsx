import { FC } from "react";
import { Controller } from "react-hook-form";
import { TextField, InputLabel } from "@material-ui/core";
import styled from "styled-components";

// types
import { IFormItemProps as IProps } from "../../types/components/users";

// css
const FormItemWrapper = styled.div`
  margin-top: 1rem;
`;

const ErrorMessage = styled.p`
  margin: 0.6rem auto auto auto;
  color: red;
  font-size: 0.9rem;
`;

export const FormItem: FC<IProps> = ({ formInfo, control }) => {
  return (
    <FormItemWrapper data-testid={`FormItem-${formInfo.nameAttribute}`}>
      <InputLabel>
        {formInfo.formLabel}
        {formInfo.errorsProperty && (
          <ErrorMessage data-testid={`${formInfo.nameAttribute}ErrorMessage`}>
            {formInfo.errorMessage}
          </ErrorMessage>
        )}
        {formInfo.apiErrorProperty?.map((message: string, index: number) => (
          <ErrorMessage
            key={`${formInfo.nameAttribute}-${index}`}
            data-testid={`${formInfo.nameAttribute}ApiError`}
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
              autoFocus={formInfo.autoFocus}
              autoComplete={formInfo.autoComplete}
              fullWidth
              inputProps={{
                "data-testid": `${formInfo.nameAttribute}Area`,
              }}
            />
          )}
        />
      </InputLabel>
    </FormItemWrapper>
  );
};
