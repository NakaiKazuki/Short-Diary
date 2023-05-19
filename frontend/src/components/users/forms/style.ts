import styled from "styled-components";

export const Item = styled.div`
  margin-top: 1rem;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin: 1rem auto;
  opacity: 0.8;
  overflow-wrap: break-word;
  padding: 0.5rem;
`;

export const FormTitle = styled.h1`
  color: limegreen;
  font-family: Comic Sans MS;
  font-size: 2.2rem;
  letter-spacing: 0.1rem;
  text-align: center;
`;

export const Form = styled.form`
  margin: 0 auto;
  width: 80vw;
  @media screen and (min-width: 980px) {
    width: 30vw;
  }
`;
