import { FC, Fragment } from "react";
import styled from "styled-components";
// Head
import { Head } from "../../Head";

// css
const ToolWrapper = styled.div`
  margin-top: 3vh;
  @media screen and (min-width: 481px) {
    margin-left: 10vw;
  }
`;

const SubTitle = styled.h2`
  font-size: 2rem;
`;

const Contents = styled.ul`
  padding-inline-start: 0;
  margin-left: 1.5vw;
  li:not(:first-child) {
    margin-top: 1rem;
  }
`;

const Content = styled.li`
  padding-inline-start: 0;
  margin-left: 1.5vw;
  font-size: 1.5rem;
`;

const ReactBlock = (): JSX.Element => {
  return (
    <Fragment>
      <SubTitle data-testid="react">React</SubTitle>
      <Contents>
        <Content>Node 18.15.0</Content>
        <Content>React 18.2.0</Content>
        <Content>TypeScript 5.0.4</Content>
        <Content>React Testing Library</Content>
        <Content>ESLint</Content>
        <Content>Prettier</Content>
      </Contents>
    </Fragment>
  );
};
const RailsBlock = (): JSX.Element => {
  return (
    <Fragment>
      <SubTitle data-testid="rails">Ruby on Rails</SubTitle>
      <Contents>
        <Content>Ruby 3.2.2</Content>
        <Content>Rails 7.0.4.3</Content>
        <Content>Puma</Content>
        <Content>RSpec</Content>
        <Content>Rubocop</Content>
      </Contents>
    </Fragment>
  );
};
const AwsBlock = (): JSX.Element => {
  return (
    <Fragment>
      <SubTitle data-testid="aws">AWS</SubTitle>
      <Contents>
        <Content>VPC</Content>
        <Content>EC2(インスタンス内でDocker使用)</Content>
        <Content>Route53</Content>
        <Content>Certificate Manager</Content>
        <Content>S3</Content>
        <Content>RDS(MySQL 8.0)</Content>
      </Contents>
    </Fragment>
  );
};
const OthersBlock = (): JSX.Element => {
  return (
    <Fragment>
      <SubTitle data-testid="others">その他</SubTitle>
      <Contents>
        <Content>Docker</Content>
        <Content>MySQL 8.0</Content>
        <Content>Google Analytics</Content>
        <Content>Github Actions</Content>
        <Content>Nginx 1.20</Content>
      </Contents>
    </Fragment>
  );
};
export const Tools: FC = () => {
  return (
    <Fragment>
      <Head title="Tools" />
      <ToolWrapper data-testid="tools">
        <ReactBlock />
        <RailsBlock />
        <AwsBlock />
        <OthersBlock />
      </ToolWrapper>
    </Fragment>
  );
};
