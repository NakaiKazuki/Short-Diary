import styled from 'styled-components';
import { Link } from "react-router-dom";
import { BaseButton } from '../shared_style';
// css
export const FormTitleWrapper = styled.h1`
  text-align: center;
  color: royalblue;
  letter-spacing: .1rem;
`;

export const FormWrapper = styled.form`
  margin: 0 auto;
  width: 80vw;
  @media screen and (min-width: 980px) {
    width: 30vw;
  };
`;

export const FormSubmitWrapper = styled(BaseButton)`
  margin: 2rem auto 0 auto;
  background-color: royalblue;
  color: white;
  border-style: none;
  width: 100%;
  height: 3rem;
  font-size: 1.1rem;
`;

export const FormLinkListWrapper = styled.div`
  text-align: center;
`;

export const FormLinkList = styled.ul`
  display: inline-block;
  text-align: left;
  list-style: none;
`;

export const FormLinkItem = styled.li`
  margin-top: 1rem;
`;

export const FormLink = styled(Link)`
  cursor: pointer;
  display: block;
  padding: .5rem;
  border: .0125rem solid royalblue;
  border-radius: .25rem;
  color: royalblue;
  background-color: white;
  text-decoration: none;
  :hover {
    background-color: royalblue;
    color: white;
  }
`;