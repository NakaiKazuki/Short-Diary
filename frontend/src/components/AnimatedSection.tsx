import { FC } from "react";
import { useRef } from "react";
import { useInView } from "framer-motion";
import styled from "styled-components";
import { IAnimatedSection as IProps } from "../types/components";

const Span = styled.span<{ isInView: boolean }>`
  opacity: ${(props) => (props.isInView ? 1 : 0)};
  transform: ${(props) => (props.isInView ? "none" : "translateX(-200px)")};
  transition: all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s;
`;

export const AnimatedSection: FC<IProps> = ({ children }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <Span ref={ref} isInView={isInView} data-testid="animatedSection">
      {children}
    </Span>
  );
};
