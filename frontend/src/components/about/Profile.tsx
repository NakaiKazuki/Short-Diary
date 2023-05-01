import { FC, Fragment } from "react";
import styled from "styled-components";

// Head
import { Head } from "../../Head";
// Icons
import { GitHubIcon, TwitterIcon } from "../icon";

// css
const Container = styled.div`
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
  list-style: none;
  padding-inline-start: 0;
  margin-left: 1.5vw;
  font-size: 1.5rem;
`;

const ContentTitle = styled.div`
  margin-top: 1.8rem;
  font-weight: bold;
`;

const ContentSubTitle = styled.span`
  font-size: 1.2rem;
  margin-left: 1rem;
  font-weight: bold;
`;

const InnerUl = styled.ul`
  padding-inline-start: 1vw;
`;

const InnerLi = styled.li`
  margin-top: 1rem;
  list-style: none;
  font-size: 1.2rem;
`;

const TextLi = styled.li`
  list-style: none;
  font-size: 1.2rem;
  margin-left: 1rem;
`;

const Paragraph = styled.p`
  width: 95%;
  margin: 0.5rem auto 0 auto;
  font-size: 1.2rem;
`;

const Link = styled.a`
  margin-left: 1rem;
  text-decoration: none;
  :visited {
    color: inherit;
  }
`;

const MessageWrapper = styled.div`
  margin-bottom: 5vh;
`;

const MessageLink = styled.a`
  :visited {
    color: inherit;
  }
`;
const Introduction = (): JSX.Element => {
  return (
    <Fragment>
      <SubTitle data-testid="introductionTitle">製作者について</SubTitle>
      <Contents>
        <Content>
          <ContentTitle>自己紹介:</ContentTitle>
          <InnerUl>
            <InnerLi>年齢性別: 25歳 / 男 </InnerLi>
            <InnerLi>学歴:文系大卒(2020年)</InnerLi>
            <InnerLi>現職: フリーター</InnerLi>
            <InnerLi>希望職種: フロントエンドエンジニア</InnerLi>
            <InnerLi>住んでる場所: 大阪</InnerLi>
            <InnerLi>職探し: 大阪をメインに他も色々見てます。</InnerLi>

            <InnerLi>
              My Accounts:
              <Link href="https://github.com/NakaiKazuki" target="_blank">
                <GitHubIcon />
                GitHub
              </Link>
              <Link href="https://twitter.com/k_kyube" target="_blank">
                <TwitterIcon color="primary" />
                Twitter
              </Link>
            </InnerLi>
          </InnerUl>
          <ContentTitle>趣味:</ContentTitle>
          <ContentSubTitle>ゲーム:</ContentSubTitle>
          <InnerUl>
            <TextLi>元ポケモン色厳選の民</TextLi>
            <TextLi>現古のMMORPGプレイヤー</TextLi>
            <TextLi>暇になったらロックマンエグゼをやりたいです！</TextLi>
          </InnerUl>
          <ContentSubTitle>お酒:</ContentSubTitle>
          <InnerUl>
            <TextLi>レモンサワーをメインにビールと焼酎をたまに飲みます</TextLi>
          </InnerUl>
          <ContentSubTitle>散歩:</ContentSubTitle>
          <InnerUl>
            <TextLi>天気の良い日に近所を歩く程度</TextLi>
          </InnerUl>
          <ContentTitle>私の長所:</ContentTitle>
          <Paragraph>
            相手の立場になって物事を考えることができることです。
            <br />
            この長所が活かされたのは現在の職場で新しく同僚が出来た時の事があげられます。
            <br />
            元々私自身が人に話しかけに行くことが得意ではなかったのですが、私が働き始めたときは覚えることが多くわからないことだらけで不安だった経験があるので、
            <br />
            少しでも相手が困ってそうだなと感じたらどこがわからないのかを自分から聞きに行くことを心がけました。
            <br />
            結果としてその後のコミュニケーションも取りやすくわからないことは積極的に聞いてもらえるようになりました。
            <br />
            なので現在では同僚お客さんどちらも困ってそうな雰囲気を感じたら自分から話しかけに行くようにしています。
            <br />
            この経験から、相手のことを考えて自分から積極的に動くことが良い人間関係の構築に繋がり働きやすい環境を作れることを学びました。
          </Paragraph>
          <ContentTitle>エンジニア志望動機:</ContentTitle>
          <Paragraph>
            元々 PC
            でゲームをすることが好きで何か手に職をつけたいと考えたときに、一番身近にある
            PC を利用したものにしようと考えエンジニアを目指し独学を始めました。
            <br />
            勉強をし始めたときは何度もエラーになったことで挫けましたが、それでも進めていくうちにエラーの対処にも慣れ今では一人で
            web アプリの開発が行えるようになりました。
            <br />
            また勉強を続けられた要因としてエラーを解決できた時の喜びや、自分で作ったものがきちんと画面上で動くというのがとても新鮮で楽しかったので独学でも継続できた要因です。
            <br />
            今後は作れるものを増やすため一旦腰を落ち着かせて React
            を軸にデザインやバックエンドについても習得していきたいと考えています。
          </Paragraph>
          <ContentTitle>この先やってみたいこと:</ContentTitle>
          <Paragraph>
            現在はフロントエンドについて深掘りをしたいと考えているので今後はHTMLCSS関連やJacaScriptについての引き出しを増やしながら、コード自体をもっと綺麗書きつつSEOとデザインついての勉強をして見やすく使いやすいサイト作れるようなりたいと考えています。
            <br />
            ゆくゆくはデザイン・バックエンドの知識もあるフロントエンドエンジニアを目指したいと考えています。
          </Paragraph>
          <Paragraph>
            将来的にやってみたいことで地方問題を解決するために機会の創出を行えるサービスを作ってみたいと考えています。
            <br />
            理由として継業問題などの今まで続いていてその先も価値を産出し続けるものがただ機会がないというだけでなくなるのは勿体ないと思っているからです。
            <br />
            確かに現在でも継業を行うサービスはありますが、現状の問題として純粋にマッチするための分母が足りないと考えているのでその土地の実態を知ってもらい移住のきっかけになるようなサービスを作ってみたいです。
            <br />
            将来的にはアイデアを形にできるだけの技術を身に着け、移住希望の方の意見を聞きながら少しでも地方問題を解決できる助けになるものを作りたいと思っています。
            <br />
          </Paragraph>
        </Content>
      </Contents>
    </Fragment>
  );
};
const AppExplanation = (): JSX.Element => {
  return (
    <Fragment>
      <SubTitle data-testid="appExplanationTitle">このアプリについて</SubTitle>
      <Contents>
        <Content>
          <ContentTitle>概要</ContentTitle>
          <Paragraph>
            ちょっとした思いつきやメモなどを200
            文字以内の日記として記録するアプリケーションです。
            <br />
            日記帳などの紙に書く日記との差別化として、その日 YouTube
            で見た動画でよかったものを記録再生可能にすることで差別化をしています。
          </Paragraph>
        </Content>
        <Content>
          <ContentTitle>こだわったポイント</ContentTitle>
          <Paragraph>
            テキストでの表示だけじゃなくアイコンも使用することで直観的に理解できるようにしました。
            <br />
            その一環としてメニューバーなどのアイコンや配置に関しても Twitter や
            YouTube などで設置されてる場所を参考に設置しました。
            <br />
            ログイン後に表示されるページで日記の基本的な動作(CRUD)を全て行えるようにしました。
            <br />
          </Paragraph>
        </Content>
        <Content>
          <ContentTitle>制作時に苦労したこと</ContentTitle>
          <Paragraph>
            devise_token_authを利用したゲストユーザーのログイン機能の作り方がわからなかったことです。
            <br />
            当時は調べても記事が見つからず途方にくれましたが、いっそソースコードから該当する部位を参考にすればよいのではと考え実装することができました。
            <br />
            今ではドキュメントを見て困ったらソースコードを見に行くようにしています。また理解できなくても自分に足りない要素が見つかる癖がついたのは良かったと思います。
            <br />
            他にも苦労したことも多々ありますが、対処すると気づく足りない要素だらけの自分を見ると無限にやることが沸いてきます(笑)それも含めて楽しいのでこれからも頑張りたいです！
          </Paragraph>
        </Content>
      </Contents>
    </Fragment>
  );
};

const Message = (): JSX.Element => {
  return (
    <MessageWrapper>
      <SubTitle data-testid="messageTitle">さいごに</SubTitle>
      <Paragraph>
        お声かけいただけるのであればお手数ですが、
        <MessageLink href="https://twitter.com/k_kyube">
          <TwitterIcon color="primary" />
          Twitter
        </MessageLink>
        のDMか画面左下のContactボタンからのご連絡お待ちしております。
      </Paragraph>
    </MessageWrapper>
  );
};

export const Profile: FC = () => {
  return (
    <Fragment>
      <Head title="Profile" />
      <Container data-testid="profile">
        <Introduction />
        <AppExplanation />
        <Message />
      </Container>
    </Fragment>
  );
};
