import styled from 'styled-components';
import { BaseButton } from '../shared_style';

// css
export const FormTitleWrapper = styled.h1`
  text-align: center;
  color: royalblue;
  letter-spacing: .1rem;
`;

export const FormWrapper = styled.form`
  margin: 0 auto;
  width:80vw;
  @media screen and (min-width: 980px) {
    width:30vw;
  };
`;

export const FormSubmitWrapper = styled(BaseButton)`
  margin: 1.5rem auto 0 auto;
  background-color: royalblue;
  color: white;
  border-style: none;
  width: 100%;
  height: 3rem;
  font-size: 1.1rem;
`;