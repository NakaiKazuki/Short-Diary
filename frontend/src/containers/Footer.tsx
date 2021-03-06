import { FC } from "react";
import styled from "styled-components";

// components
import { BaseButton } from "../components/shared_style";

const AppFooter = styled.footer`
  height: 5.5vh;
  padding: 1.5vh 1vw 0 0;
  background-color: #25cec0;
`;

const Link = styled.a`
  float: right;
  margin: 0 0 0 auto;
`;

const LinkItem = styled(BaseButton)`
  height: 4.5vh;
  padding: 0 1rem;
  margin-bottom: 1vh;
  font-size: 1rem;
  border-style: none;
  background-color: white;
  color: royalblue;
`;

export const Footer: FC = () => {
  return (
    <AppFooter data-testid="footer">
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
