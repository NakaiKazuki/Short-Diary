import { FC, Fragment, useContext } from "react";
import styled from "styled-components";

//contexts
import { ContactContext } from "../contexts/Contact";
import { AuthContext } from "../contexts/Auth";

// 型
export const Contact: FC = () => {
  const { open, setOpenContact } = useContext(ContactContext);
  const { currentUser } = useContext(AuthContext);

  return open ? (
    <Fragment>
      contactForm
    </Fragment>
  ): null
};
