import { FC, ChangeEvent } from "react";
import { Pagination } from "@mui/material";
import { Theme as MuiTheme } from "@mui/material/styles";
import styled from "styled-components";
// types
import { IPaginationAreaProps as IProps } from "../types/components";

// css
const styles = (theme: MuiTheme) => ({
  margin: "0 auto",
  display: "flex",
  "& .MuiPaginationItem-page": {
    fontSize: "2rem",
    color: "limegreen",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "limegreen",
      color: "white",
    },
  },
  "& .MuiPagination-ul": {
    margin: "0 auto",
  },
  "& .MuiPaginationItem-icon": {
    color: "limegreen",
  },
  "&& .Mui-selected": {
    backgroundColor: "limegreen",
    color: "white",
    pointerEvents: "none",
  },
  [theme.breakpoints.down("xs")]: {
    margin: "5rem 0 1rem 0",
  },
});

const PaginationWrapper = styled.div`
  margin: 2rem 0 1.4rem;
`;

export const PaginationArea: FC<IProps> = ({ pagy, onPageChange }) => {
  return (
    <PaginationWrapper>
      <Pagination
        count={pagy.pages}
        page={pagy.page}
        onChange={(_e: ChangeEvent<unknown>, page: number) =>
          onPageChange(page)
        }
        data-testid={"paginationBar"}
        sx={styles}
      />
    </PaginationWrapper>
  );
};
