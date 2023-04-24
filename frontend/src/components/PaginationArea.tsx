import { FC, ChangeEvent } from "react";
import { Pagination } from "@material-ui/lab";
import { withStyles } from "@material-ui/core";
import styled from "styled-components";

// types
import { IPaginationAreaProps as IProps } from "../types/components";

// css
const PaginationBar = withStyles((theme) => ({
  root: {
    backgroundColor: "white",
    color: "white",
    marginBottom: "1.4rem",
    "& .Mui-selected": {
      backgroundColor: "limegreen",
      color: "white",
      pointerEvents: "none",
    },
    "& .MuiPagination-ul": {
      margin: "0 auto",
    },
    "& .MuiPaginationItem-page": {
      "&:hover": {
        backgroundColor: "limegreen",
        color: "white"
      },
    },
    [theme.breakpoints.down("xs")]: {
      margin: "1.4rem 0 1rem 0",
    },
  },

}))(Pagination);

const PaginationWrapper = styled(PaginationBar)`
  margin: 0 auto 1.4rem auto;
  display: flex;
  @media screen and (max-width: 480px) {
    margin: 1.4rem 0 1rem 0;
  }
`;

export const PaginationArea: FC<IProps> = ({ pagy, onPageChange }) => {
  return (
    <PaginationWrapper
      count={pagy.pages}
      page={pagy.page}
      onChange={(_e: ChangeEvent<unknown>, page: number) =>
        onPageChange(page)
      }
      data-testid={"paginationBar"}
    />
  );
};
