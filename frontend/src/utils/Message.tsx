import { FC } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

// atoms
import { messageAtom } from "../atoms/Message";

const Container = styled.div`
  width: 100%;
  position: fixed;
  z-index: 1;
  transition: all 0.3s;
  margin-top: 10rem;
`;

const TextWrapper = styled.p`
  text-align: center;
  margin: 0 auto;
  font-size: 1rem;
  width: 50%;
  padding: 1rem 2rem;
  font-weight: bold;

  padding: 1rem 2rem;
  color: white;
  background: limegreen;
  -webkit-box-shadow: 5px 5px 0 green;
  box-shadow: 5px 5px 0 green;

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
