import { FC } from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";

// atoms
import { contactAtom } from "../atoms/Contact";

// components
import { BaseButton } from "../components/shared_style";

// icons
import { EmailIcon, TwitterIcon } from "../components/icon";
const FooterWrapper = styled.footer`
  height: 5.5vh;
  padding: 1.5vh 1vw 0 0;
  background-color: white;
  position: fixed;
  bottom: 0;
  width: 99vw;
  z-index: 10;
  border-top: 2px solid limegreen;
`;

const Link = styled.a`
  float: right;
  margin: 0 0 0 auto;
`;

const Base = styled(BaseButton)`
  height: 4.5vh;
  padding: 0 1rem;
  margin-bottom: 1vh;
  font-size: 1.4rem;
  border-style: none;
  background-color: white;
`;

const ContactButton = styled(Base)`
  margin-left: 0.7rem;
  border: 2px solid limegreen;
  color: limegreen;
  :hover {
    color: white;
    background-color: limegreen;
  }
`;

const StyledMailIcon = styled(EmailIcon)`
  margin-right: 0.6rem;
`;

const StyledTwitterIcon = styled(TwitterIcon)`
  margin-right: 0.6rem;
  color: #1da1f2;
`;

const LinkItem = styled(Base)`
  border: 2px solid limegreen;
  color: limegreen;
  :hover {
    color: white;
    background-color: #1da1f2;
    border: 2px solid #1da1f2;
    ${StyledTwitterIcon} {
      color: white;
    }
  }
`;

export const Footer: FC = () => {
  const setContact = useSetRecoilState(contactAtom);
  const onContactButton = (): void => setContact(true);
  return (
    <FooterWrapper data-testid="footer">
      <ContactButton onClick={onContactButton} data-testid="contactButton">
        <StyledMailIcon />
        Contact
      </ContactButton>
      <Link
        href="https://twitter.com/k_kyube"
        target="_blank"
        data-testid="twitterLink"
      >
        <LinkItem>
          <StyledTwitterIcon />
          Twitter
        </LinkItem>
      </Link>
    </FooterWrapper>
  );
};
