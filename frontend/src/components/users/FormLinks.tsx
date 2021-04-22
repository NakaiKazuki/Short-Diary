import React, {
  VFC,
  Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// css
const FormLinkListWrapper = styled.div`
  text-align: center;
`;

const FormLinkList = styled.ul`
  display: inline-block;
  text-align: left;
  list-style: none;
`;

const FormLinkItem = styled.li`
  margin-top: 1rem;
`;

const FormLink = styled(Link)`
  cursor: pointer;
  display: block;
  padding: .5rem;
  border: .0125rem solid royalblue;
  border-radius: .25rem;
  color: royalblue;
  background-color: white;
  text-decoration: none;
  :hover {
    background-color: royalblue;
    color: white;
  }
`;

// 型
interface IlinkInfo {
  url: string;
  text: string;
}

interface IFormLinks {
  linkInfo: Array<IlinkInfo>;
}

export const FormLinks:VFC<IFormLinks> = ({
  linkInfo
}) => {
  return(
    <Fragment>
    {
      linkInfo.map((obj: IlinkInfo, index: number) => {
        return (
          <Fragment key={`formLinkArea-${index}`}>
            <FormLinkListWrapper>
            <FormLinkList>
              <FormLinkItem>
                <FormLink to={obj.url} data-testid={`formLink-${index}`}>{obj.text}</FormLink>
              </FormLinkItem>
            </FormLinkList>
          </FormLinkListWrapper>
          </Fragment>
        )
      })
    }
    </Fragment>
  );
}