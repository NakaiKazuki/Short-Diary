import React, { VFC } from 'react';
import { Pagination } from '@material-ui/lab';
import styled from 'styled-components';

const PaginationWrapper = styled.div`
  display: flex;
  margin-bottom: 1.4rem;
  @media screen and (max-width:480px) {
    margin: 1.4rem 0 1rem 0;
  }
`;

const PaginationBar = styled(Pagination)`
  margin: 0 auto;
`;

// 型
interface IPagy {
  page: number;
  pages: number;
}

interface IPaginationAreaProps {
  pagy: IPagy;
  onPageChange(page: number): void;
}

export const PagenationArea:VFC<IPaginationAreaProps> = ({
  pagy,
  onPageChange
}) => {
  return (
    <PaginationWrapper>
      <PaginationBar
        count={pagy.pages}          //総ページ数
        color="primary"     //ページネーションの色
        page={pagy.page}         //現在のページ番号
        onChange={(e:React.ChangeEvent<unknown>, page: number) => onPageChange(page)}  //変更されたときに走る関数。第2引数にページ番号が入る
        data-testid={'pagenationBar'}
      />
    </PaginationWrapper>
  );
}