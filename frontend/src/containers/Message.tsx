import { VFC, useContext, useEffect } from "react";
import styled from "styled-components";

// contexts
import { MessageContext } from "../contexts/Message";

const MessageWrapper = styled.div`
  padding: 2.5vh 0 1.5vh;
  width: 100%;
  background-color: limegreen;
  position: fixed;
  z-index: 1;
`;

const TextWrapper = styled.p`
  text-align: center;
  margin: 0 15%;
  color: white;
  font-size: 1rem;
`;

export const Message: VFC = () => {
  const { message, setMessage } = useContext(MessageContext);

  useEffect((): void => {
    if (message) {
      setTimeout(() => setMessage(undefined), 10000);
    }
  }, [message, setMessage]);

  return message ? (
    <MessageWrapper data-testid="message">
      <TextWrapper>{message}</TextWrapper>
    </MessageWrapper>
  ) : null;
};
