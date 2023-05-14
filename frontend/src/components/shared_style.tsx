import styled from "styled-components";
import { motion } from "framer-motion";
// ボタンの元となるコンポーネント
const buttonVariants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
} as const;

export const BaseButton = styled(motion.button).attrs<typeof buttonVariants>(
  () => ({
    animate: "rest",
    initial: "rest",
    variants: buttonVariants,
    whileHover: "hover",
    whileTap: "tap",
  })
)`
  border-radius: 0.25rem;
  cursor: pointer;
  font-family: Comic Sans MS;
  overflow: hidden;
  position: relative;
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
  &:before {
    border-radius: 50%;
    content: "";
    display: block;
    height: 0;
    left: 50%;
    opacity: 0.3;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 0;
  }
`;

export const CurtainButton = styled.button`
  align-items: center;
  background: white;
  border-bottom: none;
  border-left: solid 2px limegreen;
  border-right: none;
  border-top: none;
  color: limegreen;
  cursor: pointer;
  display: flex;
  font-family: Comic Sans MS;
  justify-content: space-around;
  position: relative;
  z-index: 0;
  &:before {
    background: limegreen;
    bottom: 0;
    content: "";
    display: block;
    left: 0;
    position: absolute;
    top: 0;
    transition: 0.3s;
    width: 0;
  }

  &:hover {
    color: white;
  }
  &:hover:before {
    width: 100%;
    z-index: -1;
  }
`;

export const ColorRed = styled.span`
  color: red;
`;
