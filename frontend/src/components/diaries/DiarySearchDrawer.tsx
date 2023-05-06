import { FC, Fragment } from "react";
import {
  Box,
  SwipeableDrawer,
  List,
  Divider,
  ListItem,
  TextField,
} from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Controller } from "react-hook-form";
import styled from "styled-components";

// components
import { BaseButton } from "../shared_style";

// types
import { IDiarySearchDrawerProps as IProps } from "../../types/components/diaries";

// css
const WordSearchForm = styled.form`
  width: 100%;
  margin: 2rem 0;
`;

const Button = styled(BaseButton)`
  height: 3rem;
  width: 100%;
  margin: 2rem auto 0 auto;
  float: right;
  color: limegreen;
  background-color: white;
  border: 0.0125rem solid limegreen;
  letter-spacing: 0.2rem;
  font-size: 1.2rem;
  :hover {
    opacity: 0.8;
    background-color: limegreen;
    color: white;
  }
`;
const styles = {
  "& .MuiPickersLayout-toolbar": {
    display: "none",
  },
  "& .MuiPickersLayout-actionBar": {
    display: "none",
  },
};
export const DiarySearchDrawer: FC<IProps> = ({
  control,
  selectedDate,
  isOpenDrawer,
  onOpenButton,
  onClearButton,
  onSubmit,
  onDateChange,
}) => {
  return (
    <Fragment key={"right"}>
      <SwipeableDrawer
        anchor={"right"}
        open={isOpenDrawer}
        onClose={onOpenButton(false)}
        onOpen={onOpenButton(true)}
        sx={styles}
      >
        <Box component="div" role="presentation" data-testid="searchDrawer">
          <List>
            <ListItem data-testid="dateSearchField">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                  value={selectedDate}
                  onChange={onDateChange}
                  orientation="landscape"
                />
              </LocalizationProvider>
            </ListItem>
            <Divider />
            <ListItem data-testid="wordSearchField">
              <WordSearchForm onSubmit={onSubmit}>
                <Controller
                  name="searchWord"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Search by Word"
                      type="search"
                      multiline
                      {...field}
                      sx={{ color: "limegreen" }}
                    />
                  )}
                />
                <Button type="submit" data-testid="searchSubmit">
                  検索
                </Button>
              </WordSearchForm>
            </ListItem>
            <Divider />
            <ListItem>
              <Button onClick={onClearButton} data-testid="clearButton">
                Clear
              </Button>
            </ListItem>
          </List>
        </Box>
      </SwipeableDrawer>
    </Fragment>
  );
};
