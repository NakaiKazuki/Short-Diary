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
  autoFocus: boolean;
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
          return (
            <Fragment key={`ItemArea-${index}`}>
              <FormItem
                  formLabel={obj.formLabel}
                  errorsProperty={obj.errorsProperty}
                  errorMessage={obj.errorMessage}
                  apiErrorProperty={obj.apiErrorProperty}
                  apiMessagePropertyName={obj.apiMessagePropertyName}
                  nameAttribute={obj.nameAttribute}
                  typeAttribute={obj.typeAttribute}
                  control={obj.control}
                  defaultValue={obj.defaultValue}
                  autoFocus={obj.autoFocus}
                  rules={obj.rules}
              />
            </Fragment>
          )
        })
      }
    </Fragment>
  );
}