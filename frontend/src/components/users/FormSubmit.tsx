import { VFC } from 'react';
import styled from 'styled-components';
import { BaseButton } from '../shared_style';

const FormSubmitWrapper = styled(BaseButton)`
  margin: 2rem auto 0 auto;
  background-color: royalblue;
  color: white;
  border-style: none;
  width: 100%;
  height: 3rem;
  font-size: 1.1rem;
`;
// 型
interface ISubmit {
  isDisabled: boolean;
  onSubmitText: string;
}

export const FormSubmit: VFC<ISubmit> = ({
  isDisabled,
  onSubmitText,
}) => {
  return(
    <FormSubmitWrapper
      type='submit'
      disabled={isDisabled}
      data-testid='formSubmit'
    >
      {onSubmitText}
    </FormSubmitWrapper>
  );
}