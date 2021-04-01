import React, { VFC, Fragment } from 'react';

// components
import { FormItem } from './FormItem';

// 型
interface IRurles {
  required: boolean;
  maxLength: number;
  minLength?: number;
}

interface IObject {
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

type TFormInfo<T> = [T,T, ...T[]];

interface ISharedFormProps {
  formInfo: TFormInfo<IObject>;
}

export const SharedFormArea:VFC<ISharedFormProps> = ({
  formInfo,
}) => {
  return(
    <Fragment>
      {
        formInfo.map((obj: IObject, index: number) => {
          return <Fragment key={`ItemArea-${index}`}>
            <FormItem
              errorsProperty={obj.errorsProperty}
              control={obj.control}
              apiErrorProperty={obj.apiErrorProperty}
              formLabel={obj.formLabel}
              errorMessage={obj.errorMessage}
              apiMessagePropertyName={obj.apiMessagePropertyName}
              nameAttribute={obj.nameAttribute}
              typeAttribute={obj.typeAttribute}
              rules={obj.rules}
            />
          </Fragment>
        })
      }
    </Fragment>
  );
}