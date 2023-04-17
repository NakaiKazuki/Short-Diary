import { FC, Fragment } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// types
import { ILink, ILinks } from "../../types/components/users";

// css
const LinkListWrapper = styled.div`
  text-align: center;
`;

const LinkList = styled.ul`
  display: inline-block;
  text-align: left;
  list-style: none;
  padding-inline-start: 0;
`;

const LinkArea = styled.li`
  margin-top: 1rem;
`;

const FormLink = styled(Link)`
  cursor: pointer;
  display: block;
  padding: 0.5rem;
  border: 0.0125rem solid royalblue;
  border-radius: 0.25rem;
  color: royalblue;
  background-color: white;
  text-decoration: none;
  :hover {
    background-color: royalblue;
    color: white;
    transition: 0.3s;
  }
`;

export const FormLinks: FC<ILinks> = ({ linkInfo }) => {
  return (
    <Fragment>
      {linkInfo.map((obj: ILink, index: number) => {
        return (
          <Fragment key={`formLinkArea-${index}`}>
            <LinkListWrapper>
              <LinkList>
                <LinkArea>
                  <FormLink to={obj.url} data-testid={`formLink-${index}`}>
                    {obj.text}
                  </FormLink>
                </LinkArea>
              </LinkList>
            </LinkListWrapper>
          </Fragment>
        );
      })}
    </Fragment>
  );
};
