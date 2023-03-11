import { FC } from "react";
import styled from "styled-components";
import { BaseButton } from "../shared_style";

// types
import { IFormSubmit as IProps } from "../../types/components/users";

const Submit = styled(BaseButton)`
  margin: 2rem auto 0 auto;
  background-color: royalblue;
  color: white;
  border-style: none;
  width: 100%;
  height: 3rem;
  font-size: 1.1rem;
`;

export const FormSubmit: FC<IProps> = ({ isDisabled, onSubmitText }) => {
  return (
    <Submit type="submit" disabled={isDisabled} data-testid="formSubmit">
      {onSubmitText}
    </Submit>
  );
};
