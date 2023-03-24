import { FC } from "react";
import { useRef } from "react";
import { useInView } from "framer-motion";
import styled from "styled-components";
import { ISection as IProps } from "../types/components";
const Span = styled.span<{ isInView: boolean }>`
  transform: ${(props) => (props.isInView ? "none" : "translateX(-200px)")};
  opacity: ${(props) => (props.isInView ? 1 : 0)};
  transition: all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s;
`;

export const Section: FC<IProps> = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <Span ref={ref} isInView={isInView} data-testid="section">
      {children}
    </Span>
  );
};
