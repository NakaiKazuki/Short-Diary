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
    variants: buttonVariants,
    whileHover: "hover",
    whileTap: "tap",
    initial: "rest",
    animate: "rest",
  })
)`
  cursor: pointer;
  border-radius: 0.25rem;
  position: relative;
  overflow: hidden;
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

export const CurtainButton = styled.button`
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
  transition: 0.3s ease-in-out;
  z-index: 0;
  border-left: solid 0.32rem limegreen;
  border-top: none;
  border-right: none;
  border-bottom: none;
  background: white;
  color: limegreen;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 0;
    display: block;
    background: limegreen;
    transition: 0.3s;
    left: 0;
  }

  &:hover {
    color: white;
  }
  &:hover:before {
    width: 100%;
    z-index: -1;
  }
`;
