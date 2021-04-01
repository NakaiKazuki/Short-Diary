import React, { VFC, Fragment } from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@material-ui/core'
import styled from 'styled-components';

// css
const FormLabelWrapper = styled.label`
  opacity: .7;
`;

const FormInputWrapper = styled(TextField)`
  margin-bottom: 1.2rem;
`;

const FormErrorMessageWrapper = styled.p`
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
  errorsProperty: string;
  control: any;
  apiErrorProperty: Array<string> | undefined;
  formLabel: string;
  errorMessage: string;
  apiMessagePropertyName: string;
  nameAttribute: string;
  typeAttribute: string;
  rules: IRurles;
}

export const FormItem:VFC<IFormItemProps> = ({
  errorsProperty,
  control,
  apiErrorProperty,
  formLabel,
  errorMessage,
  apiMessagePropertyName,
  nameAttribute,
  typeAttribute,
  rules,
}) => {
  return (
    <Fragment>
      <FormLabelWrapper>{formLabel}</FormLabelWrapper>
      {errorsProperty &&
        <FormErrorMessageWrapper>{errorMessage}</FormErrorMessageWrapper>
      }
      {apiErrorProperty && apiErrorProperty.map((message: string, index: number) =>
        <FormErrorMessageWrapper key={`${nameAttribute}-${index}`}>{`${apiMessagePropertyName}${message}`}</FormErrorMessageWrapper>
      )}
      <Controller
        name={nameAttribute}
        control={control}
        defaultValue=""
        rules={ rules }
        as={
          <FormInputWrapper
            type={typeAttribute}
            fullWidth
            data-testid={`${nameAttribute}Area`}
          />
        }
      />
    </Fragment>
  );
}