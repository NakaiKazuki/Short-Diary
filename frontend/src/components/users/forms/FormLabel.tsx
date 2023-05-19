import { Fragment, FC } from "react";
import { ColorRed } from "../../shared_style";

export const FormLabel: FC<{ name: string; required: boolean }> = ({
  name,
  required = false,
}) => {
  return required ? (
    <Fragment>
      <ColorRed>*</ColorRed>
      {name}
    </Fragment>
  ) : (
    <Fragment>{name}</Fragment>
  );
};
