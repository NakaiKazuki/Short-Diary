import { FC, useEffect, Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { IHeadContext as IContext } from "./types";
import { useLocation } from 'react-router-dom';

export const Head: FC<IContext> = (props) => {
  const { title } = props;
  const location = useLocation();
  useEffect(() => {
    if (!(process.env.NODE_ENV === 'production')) return;


    if (!(process.env.REACT_APP_GA_UA && process.env.REACT_APP_GA_G)) {
      console.log(
        "Tracking not enabled, as `trackingId` was not given and there is no `GA_MEASUREMENT_ID`."
      );
      return;
    }

    window.gtag("config", process.env.REACT_APP_GA_UA, {
      page_path: location.pathname,
      page_title: `Short Diary ${title}`
    });

    window.gtag("config", process.env.REACT_APP_GA_G, {
      page_path: location.pathname,
      page_title: `Short Diary ${title}`
    });
  }, [title, location]);

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
      {
        (process.env.NODE_ENV === 'production') &&
        <Fragment>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.REACT_APP_GA_G}`}
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
        </Fragment>
      }
    </Helmet>
  );
};
