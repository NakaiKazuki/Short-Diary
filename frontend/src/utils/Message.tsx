import { FC } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

// atoms
import { messageAtom } from "../atoms/Message";

const Container = styled.div`
  margin-top: 10rem;
  position: fixed;
  transition: all 0.3s;
  width: 100%;
  z-index: 1;
`;

const TextWrapper = styled.p`
  background: limegreen;
  box-shadow: 5px 5px 0 green;
  -webkit-box-shadow: 5px 5px 0 green;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  margin: 0 auto;
  padding: 1rem 2rem;
  padding: 1rem 2rem;
  text-align: center;
  width: 50%;

  @media screen and (max-width: 480px) {
    width: 80%;
  }
`;

const MESSAGE_DISPLAY_TIME = 5000;

export const Message: FC = () => {
  const [message, setMessage] = useRecoilState(messageAtom);
  if (!message) return null;

  setTimeout(() => setMessage(undefined), MESSAGE_DISPLAY_TIME);

  return (
    <Container data-testid="message">
      <TextWrapper>{message}</TextWrapper>
    </Container>
  );
};
