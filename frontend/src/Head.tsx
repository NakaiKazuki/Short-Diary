import { FC, Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { IHeadProps as IProps } from "./types";
import { useLocation } from "react-router-dom";

const ogpImage =
  "https://user-images.githubusercontent.com/62586169/232545086-920d2ecb-026e-4add-8aa8-9228efed8a2e.png";
const description =
  "Short Diaryでは200文字以内の日記を気軽に作成することができます";
export const Head: FC<IProps> = ({ title, type = "article" }) => {
  const location = useLocation();
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <link rel="icon" href="favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={process.env.REACT_APP_TWITTER_USER} />
      <meta name="twitter:title" content="Short Diary" />
      <meta
        name="twitter:description"
        content={`${description} React/Rails 就活用ポートフォリオ`}
      />
      <meta name="twitter:image" content={ogpImage} />
      <meta
        property="og:url"
        content={`${process.env.REACT_APP_HOST_SERVER}${location.pathname}`}
      />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={`Short Diary ${title}`} />
      <meta property="og:site_name" content="Short Diary" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogpImage} />

      <title>{`Short Diary ${title}`}</title>
      {process.env.NODE_ENV === "production" && (
        <Fragment>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.REACT_APP_GA_G}`}
          ></script>
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.REACT_APP_GA_UA}', { page_path: "${location.pathname}", page_title: "Short Diary ${title}" });
              gtag('config', '${process.env.REACT_APP_GA_G}', { page_path: "${location.pathname}", page_title: "Short Diary ${title}" });
            `}
          </script>
        </Fragment>
      )}
    </Helmet>
  );
};
