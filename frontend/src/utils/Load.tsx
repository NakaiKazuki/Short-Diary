import { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection } from "../components/AnimatedSection";
const LoadContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100%;
`;

const Title = styled(motion.span)`
  color: limegreen;
  font-family: Comic Sans MS;
  font-size: 5rem;
  font-weight: bold;
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
