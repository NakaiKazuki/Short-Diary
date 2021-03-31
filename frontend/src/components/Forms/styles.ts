import styled from 'styled-components';
import { TextField } from '@material-ui/core'
import { BaseButton } from '../shared_style';

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

export const FormLabelWrapper = styled.label`
  opacity: .7;
`;
export const FormItemWrapper = styled(TextField)`
  margin-bottom: 1.2rem;
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

export const FormErrorMessageWrapper = styled.p`
  margin: .6rem auto auto auto;
  color: red;
  font-size: .9rem;
`;
