import React, {
  VFC,
  Fragment } from 'react';

// components
import { FormItem } from './FormItem';

// 型
interface IRurles {
  required: boolean;
  maxLength: number;
  minLength?: number;
}

interface IObject {
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
interface IFormInfo {
  name?: IObject;
  email: IObject;
  password: IObject;
  password_confirmation?: IObject;
}

interface IFormProps {
  formInfo: IFormInfo;
}

export const FormArea:VFC<IFormProps> = ({
  formInfo,
}) => {
  return(
    <Fragment>
      {
        formInfo.name &&
          <FormItem
            formLabel={formInfo.name.formLabel}
            errorsProperty={formInfo.name.errorsProperty}
            errorMessage={formInfo.name.errorMessage}
            apiErrorProperty={formInfo.name.apiErrorProperty}
            apiMessagePropertyName={formInfo.name.apiMessagePropertyName}
            nameAttribute={formInfo.name.nameAttribute}
            typeAttribute={formInfo.name.typeAttribute}
            control={formInfo.name.control}
            defaultValue={formInfo.name.defaultValue}
            autoComplete={formInfo.name.autoComplete}
            autoFocus={formInfo.name.autoFocus}
            rules={formInfo.name.rules}
          />
      }

      <FormItem
        formLabel={formInfo.email.formLabel}
        errorsProperty={formInfo.email.errorsProperty}
        errorMessage={formInfo.email.errorMessage}
        apiErrorProperty={formInfo.email.apiErrorProperty}
        apiMessagePropertyName={formInfo.email.apiMessagePropertyName}
        nameAttribute={formInfo.email.nameAttribute}
        typeAttribute={formInfo.email.typeAttribute}
        control={formInfo.email.control}
        defaultValue={formInfo.email.defaultValue}
        autoComplete={formInfo.email.autoComplete}
        autoFocus={formInfo.email.autoFocus}
        rules={formInfo.email.rules}
      />

      <FormItem
        formLabel={formInfo.password.formLabel}
        errorsProperty={formInfo.password.errorsProperty}
        errorMessage={formInfo.password.errorMessage}
        apiErrorProperty={formInfo.password.apiErrorProperty}
        apiMessagePropertyName={formInfo.password.apiMessagePropertyName}
        nameAttribute={formInfo.password.nameAttribute}
        typeAttribute={formInfo.password.typeAttribute}
        control={formInfo.password.control}
        defaultValue={formInfo.password.defaultValue}
        autoComplete={formInfo.password.autoComplete}
        autoFocus={formInfo.password.autoFocus}
        rules={formInfo.password.rules}
      />

      {
        formInfo.password_confirmation &&
          <FormItem
            formLabel={formInfo.password_confirmation.formLabel}
            errorsProperty={formInfo.password_confirmation.errorsProperty}
            errorMessage={formInfo.password_confirmation.errorMessage}
            apiErrorProperty={formInfo.password_confirmation.apiErrorProperty}
            apiMessagePropertyName={formInfo.password_confirmation.apiMessagePropertyName}
            nameAttribute={formInfo.password_confirmation.nameAttribute}
            typeAttribute={formInfo.password_confirmation.typeAttribute}
            control={formInfo.password_confirmation.control}
            defaultValue={formInfo.password_confirmation.defaultValue}
            autoComplete={formInfo.password_confirmation.autoComplete}
            autoFocus={formInfo.password_confirmation.autoFocus}
            rules={formInfo.password_confirmation.rules}
          />
      }
    </Fragment>
  );
}
