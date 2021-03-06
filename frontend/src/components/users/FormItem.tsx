import { FC } from "react";
import { Controller } from "react-hook-form";
import { TextField, InputLabel } from "@material-ui/core";
import styled from "styled-components";

// css
const FormItemWrapper = styled.div`
  margin-top: 1rem;
`;

// const Input = styled(TextField)`
//   margin-bottom: 1.2rem;
// `;

const ErrorMessage = styled.p`
  margin: 0.6rem auto auto auto;
  color: red;
  font-size: 0.9rem;
`;

// 型
interface IRurles {
  required?: boolean;
  maxLength: number;
  minLength?: number;
}

interface IFormInfoProps {
  formLabel: string;
  errorsProperty: string;
  errorMessage: string;
  apiErrorProperty: Array<string> | undefined;
  apiMessagePropertyName: string;
  nameAttribute: string;
  typeAttribute: string;
  control: any;
  defaultValue: string;
  autoComplete: string;
  autoFocus: boolean;
  rules: IRurles;
}

interface IFormItemProps {
  formInfo: IFormInfoProps;
}

export const FormItem: FC<IFormItemProps> = ({ formInfo }) => {
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
          control={formInfo.control}
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
