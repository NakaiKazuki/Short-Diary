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
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
`;

const TextWrapper = styled.p`
  text-align: center;
  margin: 0 15%;
  color: white;
  font-size: 1rem;
`;

export const Message: FC = () => {
  const { message, setMessage } = useContext(MessageContext);

  useEffect((): void => {
    message && setTimeout(() => setMessage(undefined), 10000);
  }, [message, setMessage]);

  return message ? (
    <MessageWrapper data-testid="message">
      <TextWrapper>{message}</TextWrapper>
    </MessageWrapper>
  ) : null;
};
