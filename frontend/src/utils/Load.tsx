import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "../components/AnimatedSection";
const LoadContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled(motion.span)`
  font-size: 5rem;
  color: limegreen;
  font-weight: bold;
  font-family: Comic Sans MS;
  @media screen and (max-width: 980px) {
    font-size: 3rem;
  }
  @media screen and (max-width: 480px) {
    font-size: 3rem;
  }
`;

export const Load: FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <LoadContainer data-testid="load">
      <AnimatePresence>
        {isVisible && (
          <AnimatedSection>
            <Title
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              data-testid="title"
            >
              Short Diary
            </Title>
          </AnimatedSection>
        )}
      </AnimatePresence>
    </LoadContainer>
  );
};
