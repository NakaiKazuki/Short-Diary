import React, { VFC, Fragment } from 'react';
import { Controller } from 'react-hook-form';
import { TextField } from '@material-ui/core'
import styled from 'styled-components';

// 型
import { IObject as FormItemProps } from '../../formInfo';

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

export const FormItem:VFC<FormItemProps> = ({
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