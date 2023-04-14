import { FC, Fragment } from "react";
import styled from "styled-components";
// Head
import { Head } from "../../Head";

// css
const ProfileWrapper = styled.div`
  margin-top: 3vh;
  @media screen and (min-width: 481px) {
    margin-left: 10vw;
  }
`;

// const SubTitle = styled.h2`
//   font-size: 2rem;
// `;

export const Profile: FC = () => {
  return (
    <Fragment>
      <Head title="Tools" />
      <ProfileWrapper data-testid="profile">んにゃぴ</ProfileWrapper>
    </Fragment>
  );
};
