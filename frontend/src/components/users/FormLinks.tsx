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
  list-style: none;
  padding-inline-start: 0;
  text-align: left;
  li:first-child {
    margin-top: 1rem;
  }
  li:not(:first-child) {
    margin: 0.7rem 0;
  }
`;

const LinkArea = styled.li`
  width: auto;
`;

const FormLink = styled(Link)`
  background-color: white;
  border-radius: 0.25rem;
  border: 0.0125rem solid limegreen;
  color: limegreen;
  cursor: pointer;
  display: block;
  padding: 0.5rem;
  text-decoration: none;
  :hover {
    background-color: limegreen;
    color: white;
    transition: 0.3s;
  }
`;

export const FormLinks: FC<ILinks> = ({ linkInfo }) => {
  return (
    <LinkListWrapper>
      <LinkList>
        {linkInfo.map((obj: ILink, index: number) => {
          return (
            <Fragment key={`formLinkArea-${index}`}>
              <LinkArea>
                <FormLink to={obj.url} data-testid={`formLink-${index}`}>
                  {obj.text}
                </FormLink>
              </LinkArea>
            </Fragment>
          );
        })}
      </LinkList>
    </LinkListWrapper>
  );
};
