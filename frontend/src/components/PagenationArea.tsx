import React, { FC } from "react";
import { Pagination } from "@material-ui/lab";
import styled from "styled-components";

const PaginationWrapper = styled.div`
  display: flex;
  margin-bottom: 1.4rem;
  @media screen and (max-width: 480px) {
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

export const PagenationArea: FC<IPaginationAreaProps> = ({
  pagy,
  onPageChange,
}) => {
  return (
    <PaginationWrapper>
      <PaginationBar
        count={pagy.pages}
        color="primary"
        page={pagy.page}
        onChange={(_e: React.ChangeEvent<unknown>, page: number) =>
          onPageChange(page)
        }
        data-testid={"pagenationBar"}
      />
    </PaginationWrapper>
  );
};
