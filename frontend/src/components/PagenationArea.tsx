import React, { FC } from "react";
import { Pagination } from "@material-ui/lab";
import styled from "styled-components";
// types
import { IPaginationAreaProps as IProps } from "../types/components";
// css
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

export const PagenationArea: FC<IProps> = ({ pagy, onPageChange }) => {
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
