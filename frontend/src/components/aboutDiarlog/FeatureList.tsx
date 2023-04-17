import { FC, Fragment } from "react";
import styled from "styled-components";

// Head
import { Head } from "../../Head";
import erImage from "../../images/er.png"
// css
const FeatureListWrapper = styled.div`
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

const InnerUl = styled.ul`
  padding-inline-start: 1vw;
`;

const InnerLi = styled.li`
  padding-inline-start: 0;
  margin-top: 0.5rem;
`;

const ReactBlock = (): JSX.Element => {
  return (
    <Fragment>
      <SubTitle data-testid="react">React</SubTitle>
      <Contents>
        <Content>
          デザイン
          <InnerUl>
            <InnerLi>Material UI</InnerLi>
            <InnerLi>Styled Components</InnerLi>
          </InnerUl>
        </Content>
        <Content>
          アニメーション
          <InnerUl>
            <InnerLi>Framer Motion</InnerLi>
          </InnerUl>
        </Content>
        <Content>
          Form
          <InnerUl>
            <InnerLi>React Hook Form</InnerLi>
            <InnerLi>画像投稿機能</InnerLi>
          </InnerUl>
        </Content>
        <Content>
          PhotoGallery(日記に付随した画像一覧)
          <InnerUl>
            <InnerLi>React Image Gallery</InnerLi>
          </InnerUl>
        </Content>
        <Content>
          YouTube 動画再生
          <InnerUl>
            <InnerLi>React Youtube</InnerLi>
          </InnerUl>
        </Content>
        <Content>
          ログイン機能
          <InnerUl>
            <InnerLi>Cookie 保存</InnerLi>
          </InnerUl>
        </Content>
        <Content>
          ルーティング機能
          <InnerUl>
            <InnerLi>React Router Dom</InnerLi>
          </InnerUl>
        </Content>
        <Content>
          head 情報の変更
          <InnerUl>
            <InnerLi>React Helmet Async</InnerLi>
          </InnerUl>
        </Content>
      </Contents>
    </Fragment>
  );
};

const RailsBlock = (): JSX.Element => {
  return (
    <Fragment>
      <SubTitle data-testid="rails">Ruby on Rails</SubTitle>
      <Contents>
        <Content>
          ユーザー登録(メール認証), ログイン機能
          <InnerUl>
            <InnerLi>Devise Token Auth</InnerLi>
          </InnerUl>
        </Content>
        <Content>
          日記投稿機能
          <InnerUl>
            <InnerLi>
              画像保存
              <InnerUl>
                <InnerLi>ActiveStorage</InnerLi>
                <InnerLi>本番環境では AWS S3に保存</InnerLi>
              </InnerUl>
            </InnerLi>
            <InnerLi>
              タグ機能
              <InnerUl>
                <InnerLi>Acts As Taggable On</InnerLi>
              </InnerUl>
            </InnerLi>
          </InnerUl>
        </Content>
        <Content>
          ページネーション機能
          <InnerUl>
            <InnerLi>Pagy</InnerLi>
          </InnerUl>
        </Content>
        <Content>
          検索機能
          <InnerUl>
            <InnerLi>Ransack</InnerLi>
          </InnerUl>
        </Content>
      </Contents>
    </Fragment>
  );
};

const GitHubActionsBlock = (): JSX.Element => {
  return (
    <Fragment>
      <SubTitle data-testid="gitHubActions">GitHub Actions</SubTitle>
      <Contents>
        <Content>
          Ruby on Rails
          <InnerUl>
            <InnerLi>Rails Best Practices</InnerLi>
            <InnerLi>Brakeman</InnerLi>
            <InnerLi>Rubocop</InnerLi>
            <InnerLi>RSpec</InnerLi>
          </InnerUl>
        </Content>
        <Content>
          React
          <InnerUl>
            <InnerLi>JSLint</InnerLi>
            <InnerLi>Testing Library / Jest</InnerLi>
          </InnerUl>
        </Content>
      </Contents>
    </Fragment>
  );
};

const TestBlock = (): JSX.Element => {
  return (
    <Fragment>
      <SubTitle data-testid="test">テスト</SubTitle>
      <Contents>
        <Content>
          React
          <InnerUl>
            <InnerLi>React Testing Library / Jest</InnerLi>
          </InnerUl>
        </Content>
        <Content>
          Ruby on Rails(RSpec)
          <InnerUl>
            <InnerLi>RSpec</InnerLi>
          </InnerUl>
        </Content>
        <Content>MySQL 8.0</Content>
        <Content>Google Analytics</Content>
        <Content>Github Actions</Content>
        <Content>Nginx 1.20</Content>
      </Contents>
    </Fragment>
  );
};

const ErBlock = (): JSX.Element => {
  return (
    <Fragment>
      <SubTitle data-testid="er">ER図</SubTitle>
      <img src={erImage} />
    </Fragment>
  );
}
export const FeatureList: FC = () => {
  return (
    <Fragment>
      <Head title="FeatureList" />
      <FeatureListWrapper data-testid="featureList">
        <ReactBlock />
        <RailsBlock />
        <GitHubActionsBlock />
        <TestBlock />
        <ErBlock />
      </FeatureListWrapper>
    </Fragment>
  );
};
