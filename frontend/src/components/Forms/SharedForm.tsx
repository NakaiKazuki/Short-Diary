import React, { VFC, Fragment } from 'react';

// components
import { FormTitleWrapper,FormWrapper, FormSubmitWrapper } from './styles';
import { FormItem } from './FormItem';

// 型
interface ISharedFormProps {
  formTitle: string;
  formItemsInfo: any;
  ClickSubmit(): any;
  isDisabled(): boolean;
  onSubmitLabel(): string;
}

export const SharedForm:VFC<ISharedFormProps> = ({
  ClickSubmit,
  isDisabled,
  onSubmitLabel,
  formTitle,
  formItemsInfo,
}) => {
  return(
    <Fragment>
      <FormTitleWrapper>{formTitle}</FormTitleWrapper>
      <FormWrapper onSubmit={ClickSubmit()}>
        {
          formItemsInfo.map((obj: any) => {
            return  <FormItem
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
          })
        }
        <FormSubmitWrapper
          type="submit"
          disabled={isDisabled()}>
          {onSubmitLabel()}
        </FormSubmitWrapper>
      </FormWrapper>
    </Fragment>
  );
}