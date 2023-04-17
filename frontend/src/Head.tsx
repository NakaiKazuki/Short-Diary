import { FC, Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { IHeadProps as IProps } from "./types";
import { useLocation } from "react-router-dom";

const description = "Short Diaryでは200文字以内の日記を気軽に作成することができます"
export const Head: FC<IProps> = ({ title }) => {
  const location = useLocation();
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <link rel="icon" href="favicon.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="description"
        content={description}
      />
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
