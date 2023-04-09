import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { IHeadContext as IContext } from "./types";

export const Head: FC<IContext> = (props) => {
  const { title } = props;
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <link rel="icon" href="favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content="Short Diaryでは200文字以内の日記を気軽に作成することができます"
      />
      <title>{`Short Diary ${title}`}</title>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.REACT_APP_GA_UA}`}
      ></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag() {
            window.dataLayer.push(arguments);
          }
          gtag("js", new Date());
          gtag("config", "${process.env.REACT_APP_GA_UA}");
          gtag("config", "${process.env.REACT_APP_GA_G}");
        `}
      </script>
    </Helmet>
  );
};
