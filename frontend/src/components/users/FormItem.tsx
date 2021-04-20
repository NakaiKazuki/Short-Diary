import React, { VFC } from 'react';
import { Controller } from 'react-hook-form';
import { TextField, InputLabel } from '@material-ui/core'
import styled from 'styled-components';

// css
const FormItemWrapper = styled.div`
  margin-top: 1rem;
`;

const FormInput = styled(TextField)`
  margin-bottom: 1.2rem;
`;

const FormErrorMessage = styled.p`
  margin: .6rem auto auto auto;
  color: red;
  font-size: .9rem;
`;

// 型
interface IRurles {
  required: boolean;
  maxLength: number;
  minLength?: number;
}

interface IFormItemProps {
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

export const FormItem:VFC<IFormItemProps> = ({
  formLabel,
  errorsProperty,
  errorMessage,
  apiErrorProperty,
  apiMessagePropertyName,
  nameAttribute,
  typeAttribute,
  control,
  defaultValue,
  autoComplete,
  autoFocus,
  rules,
}) => {
  return (
    <FormItemWrapper>
      <InputLabel>
        {formLabel}
        {errorsProperty &&
          <FormErrorMessage data-testid={`${nameAttribute}ErrorMessage`}>{errorMessage}</FormErrorMessage>
        }
        {apiErrorProperty?.map((message: string, index: number) =>
          <FormErrorMessage key={`${nameAttribute}-${index}`} data-testid={`${nameAttribute}ApiError`}>{`${apiMessagePropertyName}${message}`}</FormErrorMessage>
        )}
        <Controller
          name={nameAttribute}
          control={control}
          defaultValue={defaultValue}
          rules={ rules }
          as={
            <FormInput
              type={typeAttribute}
              autoFocus={autoFocus}
              autoComplete={autoComplete}
              fullWidth
              inputProps={{
                'data-testid': `${nameAttribute}Area`,
              }}
            />
          }
        />
      </InputLabel>
    </FormItemWrapper>
  );
}