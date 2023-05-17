import { FC } from "react";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";

// atoms
import { contactAtom } from "../atoms/Contact";

// components
import { BaseButton } from "../components/shared_style";

// icons
import { EmailIcon, TwitterIcon } from "../components/icon";

// css
const FooterWrapper = styled.footer`
  background-color: white;
  border-top: 2px solid limegreen;
  bottom: 0;
  height: 3.8rem;
  padding: 1.2rem 1vw 0 0;
  position: fixed;
  width: 99vw;
  z-index: 10;

  @media screen and (max-width: 480px) {
    position: initial;
  }

  @media screen and (orientation: landscape) and (max-width: 1000px) {
    padding: 0.6rem 0;
    position: initial;
  }
`;

const Link = styled.a`
  float: right;
  margin: 0 0 0 auto;
`;

const Base = styled(BaseButton)`
  background-color: white;
  border-style: none;
  font-size: 1.4rem;
  height: 3rem;
  margin-bottom: 1vh;
  padding: 0 1rem;
`;

const ContactButton = styled(Base)`
  border: 2px solid limegreen;
  color: limegreen;
  margin-left: 0.7rem;

  :hover {
    background-color: limegreen;
    color: white;
  }
`;

const StyledMailIcon = styled(EmailIcon)`
  margin-right: 0.6rem;
`;

const StyledTwitterIcon = styled(TwitterIcon)`
  color: #1da1f2;
  margin-right: 0.6rem;
`;

const LinkItem = styled(Base)`
  border: 2px solid limegreen;
  color: limegreen;

  :hover {
    background-color: #1da1f2;
    border: 2px solid #1da1f2;
    color: white;
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
