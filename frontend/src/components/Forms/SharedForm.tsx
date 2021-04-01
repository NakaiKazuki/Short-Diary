import React, { VFC, Fragment } from 'react';
import styled from 'styled-components';
import { BaseButton } from '../shared_style';

// components
import { FormItem } from './FormItem';

// 型
import { IObject } from '../../formInfo';

// css
const FormTitleWrapper = styled.h1`
  text-align: center;
  color: royalblue;
  letter-spacing: .1rem;
`;

const FormWrapper = styled.form`
  margin: 0 auto;
  width:80vw;
  @media screen and (min-width: 980px) {
    width:30vw;
  };
`;

const FormSubmitWrapper = styled(BaseButton)`
  margin: 1.5rem auto 0 auto;
  background-color: royalblue;
  color: white;
  border-style: none;
  width: 100%;
  height: 3rem;
  font-size: 1.1rem;
`;

// 型
type TFormInfo<T> = [T,T, ...T[]];

interface ISharedFormProps {
  formTitle: string;
  formInfo: TFormInfo<IObject>;
  ClickSubmit(): any;
  isDisabled(): boolean;
  onSubmitLabel(): string;
}

export const SharedForm:VFC<ISharedFormProps> = ({
  ClickSubmit,
  isDisabled,
  onSubmitLabel,
  formTitle,
  formInfo,
}) => {
  return(
    <Fragment>
      <FormTitleWrapper>{formTitle}</FormTitleWrapper>
      <FormWrapper onSubmit={ClickSubmit()}>
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
        <FormSubmitWrapper
          type="submit"
          disabled={isDisabled()}>
          {onSubmitLabel()}
        </FormSubmitWrapper>
      </FormWrapper>
    </Fragment>
  );
}