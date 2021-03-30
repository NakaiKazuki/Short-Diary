import React, { VFC, Fragment } from 'react';
import { Controller } from 'react-hook-form';

// components
import {  FormItemWrapper, FormLabelWrapper, FormErrorMessageWrapper } from './styles';

// 型
interface IRurles {
  required?: boolean;
  maxLength?: number;
  minLength?: number;
}

interface FormItemProps{
  errorsProperty: any;
  control: any;
  apiErrorProperty: Array<string> | undefined;
  formLabel: string;
  errorMessage: string;
  apiMessagePropertyName: string;
  nameAttribute: string;
  typeAttribute: string;
  rules?: IRurles;
}

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
          <FormItemWrapper
            type={typeAttribute}
            fullWidth
            data-testid={`${nameAttribute}Area`}
          />
        }
      />
    </Fragment>
  );
}