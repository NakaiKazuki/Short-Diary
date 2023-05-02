import { FC, Fragment } from "react";
import { Head } from "../Head";

export const FreeRoute: FC<{
  jsxElement: JSX.Element;
  title: string;
}> = ({ jsxElement, title }) => {
  return (
    <Fragment>
      <Head title={title} />
      {jsxElement}
    </Fragment>
  );
};
