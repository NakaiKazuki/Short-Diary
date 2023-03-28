import styled from "styled-components";
import { motion } from "framer-motion";

// ボタンの元となるコンポーネント
const buttonVariants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
  },
  tap: {
    scale: 0.8,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

export const BaseButton = styled(motion.button).attrs(() => ({
  variants: buttonVariants,
  whileHover: "hover",
  whileTap: "tap",
  initial: "rest",
  animate: "rest",
}))`
  cursor: pointer;
  border-radius: 0.25rem;
  :hover {
    opacity: 0.9;
  }
  :focus {
    outline: 0;
  }
  :disabled {
    background-color: gray;
    color: white;
  }
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background-color: #fff;
    opacity: 0.3;
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }
`;
