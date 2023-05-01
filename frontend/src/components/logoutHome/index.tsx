import { FC } from "react";
import { Canvas } from "@react-three/fiber";
import styled from "styled-components";
import { ScrollControls, Scroll } from "@react-three/drei";
import { Back } from "./Back";

// helpers
import { onSubmitText, isDisabled } from "../../helpers";

// components
import { BaseButton } from "../shared_style";

// types
import { IProps } from "../../types/components/logoutHome";
const Text = styled.h1`
  font-size: 10rem;
  letter-spacing: 0.5rem;
  line-height: 0.7em;
  color: limegreen;
  font-weight: bold;
  position: absolute;
  text-shadow: 1px 0px 35px green;

  @media screen and (max-width: 980px) {
    font-size: 6rem;
    left: 10vw;
  }
  @media screen and (max-width: 480px) {
    font-size: 4rem;
    left: 10vw;
  }
`;

const CustomButton = styled(BaseButton)`
  border-style: none;
  letter-spacing: 0.2rem;
  color: white;
  background-color: limegreen;
  font-size: 1.2rem;
  padding: 0.5rem;
  width: 20rem;
  height: 5rem;
  border: 0.3rem solid white;
  @media screen and (max-width: 980px) {
    font-size: 0.95rem;
    width: 12rem;
    height: 3rem;
  }
`;
export const CanvasContainer: FC<IProps> = ({
  postState,
  onGuestLoginButton,
  onSignUpOpenButton,
  onAboutOpenButton,
}) => {
  return (
    <Canvas data-testid="logoutHomeCanvas">
      <ScrollControls damping={0.5} pages={4} distance={1.5}>
        <Scroll>
          <Back />
        </Scroll>
        <Scroll html>
          <Text style={{ top: "50vh", left: "10vw" }}>Record</Text>
          <Text style={{ top: "100vh", left: "50vw" }}>Your</Text>
          <Text style={{ top: "150vh", left: "10vw" }}>Daily</Text>
          <Text style={{ top: "200vh", left: "50vw" }}>Life</Text>
          <CustomButton
            type="button"
            onClick={onGuestLoginButton}
            disabled={isDisabled(postState)}
            style={{ top: "85vh", left: "10vw" }}
            data-testid="guestLoginButton"
          >
            {onSubmitText(postState, "ゲストログイン")}
          </CustomButton>
          <br />
          <CustomButton
            type="button"
            onClick={onSignUpOpenButton}
            style={{ top: "250vh", left: "10vw" }}
            data-testid="signUpButton"
          >
            ユーザー登録
          </CustomButton>
          <br />
          <CustomButton
            type="button"
            onClick={onAboutOpenButton}
            style={{ top: "265vh", left: "50vw" }}
            data-testid="aboutButton"
          >
            アプリと制作者情報
          </CustomButton>
          <br />
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
};
