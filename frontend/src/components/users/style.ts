import styled from "styled-components";

// css
export const FormTitle = styled.h1`
  text-align: center;
  color: limegreen;
  letter-spacing: 0.1rem;
  font-size: 2.2rem;
`;

export const FormWrapper = styled.form`
  margin: 0 auto;
  width: 80vw;
  @media screen and (min-width: 980px) {
    width: 30vw;
  }
`;
