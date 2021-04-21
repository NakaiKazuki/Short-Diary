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

interface IFormItemsProps {
  formInfo: IFormInfo;
}

export const FormItems:VFC<IFormItemsProps> = ({
  formInfo,
}) => {
  return(
    <Fragment>
      {
        formInfo.name &&
          <FormItem
            formInfo={formInfo.name}
          />
      }

      <FormItem
        formInfo={formInfo.email}
      />

      <FormItem
        formInfo={formInfo.password}
      />

      {
        formInfo.password_confirmation &&
          <FormItem
            formInfo={formInfo.password_confirmation}
          />
      }
    </Fragment>
  );
}
