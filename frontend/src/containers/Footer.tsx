import { FC } from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
// recoils
import { contactAtom } from "../recoils/Contact";

// components
import { BaseButton } from "../components/shared_style";

const AppFooter = styled.footer`
  height: 5.5vh;
  padding: 1.5vh 1vw 0 0;
  background-color: limegreen;
  position: fixed;
  bottom: 0;
  width: 99vw;
  z-index: 10;
`;

const Link = styled.a`
  float: right;
  margin: 0 0 0 auto;
`;

const Base = styled(BaseButton)`
  height: 4.5vh;
  padding: 0 1rem;
  margin-bottom: 1vh;
  font-size: 1rem;
  border-style: none;
  background-color: white;
`;

const LinkItem = styled(Base)`
  color: limegreen;
`;

const ContactButton = styled(Base)`
  margin-left: 0.7rem;
  color: limegreen;
`;

export const Footer: FC = () => {
  const setContact = useSetRecoilState(contactAtom);
  const onContactButton = (): void => setContact(true);
  return (
    <AppFooter data-testid="footer">
      <ContactButton onClick={onContactButton} data-testid="contactButton">
        Contact
      </ContactButton>
      <Link
        href="https://twitter.com/k_kyube"
        target="_blank"
        data-testid="twitterLink"
      >
        <LinkItem>制作者Twitter</LinkItem>
      </Link>
    </AppFooter>
  );
};
