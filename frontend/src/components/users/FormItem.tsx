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

export const FormItem:VFC<IFormItemProps> = ({
  formInfo
}) => {
  return (
    <FormItemWrapper data-testid={`FormItem-${formInfo.nameAttribute}`}>
      <InputLabel>
        {formInfo.formLabel}
        {formInfo.errorsProperty &&
          <FormErrorMessage data-testid={`${formInfo.nameAttribute}ErrorMessage`}>{formInfo.errorMessage}</FormErrorMessage>
        }
        {formInfo.apiErrorProperty?.map((message: string, index: number) =>
          <FormErrorMessage key={`${formInfo.nameAttribute}-${index}`} data-testid={`${formInfo.nameAttribute}ApiError`}>
            {`${formInfo.apiMessagePropertyName}${message}`}
          </FormErrorMessage>
        )}
        <Controller
          name={formInfo.nameAttribute}
          control={formInfo.control}
          defaultValue={formInfo.defaultValue}
          rules={ formInfo.rules }
          as={
            <FormInput
              type={formInfo.typeAttribute}
              autoFocus={formInfo.autoFocus}
              autoComplete={formInfo.autoComplete}
              fullWidth
              inputProps={{
                'data-testid': `${formInfo.nameAttribute}Area`,
              }}
            />
          }
        />
      </InputLabel>
    </FormItemWrapper>
  );
}