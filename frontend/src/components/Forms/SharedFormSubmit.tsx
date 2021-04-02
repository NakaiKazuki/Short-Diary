import React, { VFC } from 'react';
import { FormSubmitWrapper } from './style';

// 型
interface ISharedSubmit {
  isDisabled(): boolean;
  onSubmitLabel(): string;
}

export const SharedFormSubmit: VFC<ISharedSubmit> = ({
  isDisabled,
  onSubmitLabel,
}) => {
  return(
    <FormSubmitWrapper
      type="submit"
      disabled={isDisabled()}>
      {onSubmitLabel()}
    </FormSubmitWrapper>
  );
}