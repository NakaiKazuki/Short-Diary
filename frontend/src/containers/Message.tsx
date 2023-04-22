import { FC } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

// recoils
import { messageAtom } from "../recoils/Message";

const MessageWrapper = styled.div`
  padding: 2.5vh 0 1.5vh;
  width: 100%;
  background-color: limegreen;
  position: fixed;
  z-index: 1;
  transition: all 0.3s;
  margin-top: 3vh;
`;

const TextWrapper = styled.p`
  text-align: center;
  margin: 0 15%;
  color: white;
  font-size: 1rem;
`;
const MESSAGE_DISPLAY_TIME = 5000;

export const Message: FC = () => {
  const [message, setMessage] = useRecoilState(messageAtom);
  if (!message) return null;

  setTimeout(() => setMessage(undefined), MESSAGE_DISPLAY_TIME);

  return (
    <MessageWrapper data-testid="message">
      <TextWrapper>{message}</TextWrapper>
    </MessageWrapper>
  );
};
