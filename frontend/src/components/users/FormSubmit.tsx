import { FC } from "react";
import styled from "styled-components";
import { BaseButton } from "../shared_style";

// icons
import { SubmitIcon } from "../icon";

// types
import { IFormSubmit as IProps } from "../../types/components/users";

const Submit = styled(BaseButton)`
  margin: 2rem auto 0 auto;
  background-color: limegreen;
  color: white;
  border-style: none;
  width: 100%;
  height: 3rem;
  font-size: 1.1rem;
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
