import styled from "styled-components";

// css
export const FormTitle = styled.h1`
  color: limegreen;
  font-family: Comic Sans MS;
  font-size: 2.2rem;
  letter-spacing: 0.1rem;
  text-align: center;
`;

export const FormWrapper = styled.form`
  margin: 0 auto;
  width: 80vw;
  @media screen and (min-width: 980px) {
    width: 30vw;
  }
`;
