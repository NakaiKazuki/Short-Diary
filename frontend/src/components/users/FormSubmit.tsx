import { FC } from "react";
import styled from "styled-components";
import { BaseButton } from "../shared_style";

// icons
import { SubmitIcon } from "../icon";

// types
import { IFormSubmit as IProps } from "../../types/components/users";

const Submit = styled(BaseButton)`
  background-color: limegreen;
  border-style: none;
  color: white;
  font-size: 1.1rem;
  height: 3rem;
  margin: 2rem auto 0 auto;
  width: 100%;
`;

const StyledIcon = styled(SubmitIcon)`
  margin-right: 0.6rem;
`;

export const FormSubmit: FC<IProps> = ({ isDisabled, onSubmitText }) => {
  return (
    <Submit type="submit" disabled={isDisabled} data-testid="formSubmit">
      <StyledIcon />
      {onSubmitText}
    </Submit>
  );
};
