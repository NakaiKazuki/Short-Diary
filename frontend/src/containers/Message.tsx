import { FC, useContext, useEffect } from "react";
import styled from "styled-components";

// contexts
import { MessageContext } from "../contexts/Message";

const MessageWrapper = styled.div`
  padding: 2.5vh 0 1.5vh;
  width: 100%;
  background-color: limegreen;
  position: fixed;
  z-index: 1;
  transition: all 0.3s;
  margin-top: 6.6vh;
`;

const TextWrapper = styled.p`
  text-align: center;
  margin: 0 15%;
  color: white;
  font-size: 1rem;
`;
const MESSAGE_DISPLAY_TIME = 10000;
export const Message: FC = () => {
  const { message, setMessage } = useContext(MessageContext);

  useEffect((): (() => void) | undefined => {
    if (message) {
      const timeoutId = setTimeout(
        () => setMessage(undefined),
        MESSAGE_DISPLAY_TIME
      );
      return () => clearTimeout(timeoutId);
    }
  }, [message, setMessage]);

  if (!message) return null;

  return (
    <MessageWrapper data-testid="message">
      <TextWrapper>{message}</TextWrapper>
    </MessageWrapper>
  );
};
