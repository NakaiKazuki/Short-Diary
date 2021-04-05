import React, { VFC } from 'react';
import styled from 'styled-components';
import { BaseButton } from '../../shared_style';

const FormSubmit = styled(BaseButton)`
  margin: 2rem auto 0 auto;
  background-color: royalblue;
  color: white;
  border-style: none;
  width: 100%;
  height: 3rem;
  font-size: 1.1rem;
`;
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
    <FormSubmit
      type="submit"
      disabled={isDisabled()}>
      {onSubmitLabel()}
    </FormSubmit>
  );
}