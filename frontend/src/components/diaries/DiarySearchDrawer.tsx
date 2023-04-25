import { FC, Fragment } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { TextField } from "@material-ui/core";
import { Box, SwipeableDrawer, List, Divider, ListItem } from "@mui/material";
import { Controller } from "react-hook-form";
import DateFnsUtils from "@date-io/date-fns";
import styled from "styled-components";

// components
import { BaseButton } from "../shared_style";

// types
import { IDiarySearchDrawerProps as IProps } from "../../types/components/diaries";

// css
const WordSearchForm = styled.form`
  width: 100%;
`;


const Button = styled(BaseButton)`
  height:2.5rem;
  width: 90%;
  margin: 1rem auto 0 auto;
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
      >
        <Box role="presentation" data-testid="searchDrawer">
          <List>
            <ListItem>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  fullWidth
                  margin="normal"
                  label="Search by Date"
                  format="yyyy/MM/dd"
                  value={selectedDate}
                  onChange={onDateChange}
                  clearable
                  showTodayButton
                  data-testid="dateSearchField"
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                  inputProps={{
                    disabled: true,
                  }}
                />
              </MuiPickersUtilsProvider>
            </ListItem>
            <Divider />
            <ListItem>
              <WordSearchForm onSubmit={onSubmit} data-testid="wordSearchField">
                <Controller
                  name="searchWord"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      label="Search by Word"
                      type="search"
                      {...field}
                    />
                  )}
                />
                <ListItem>
                  <Button type="submit" data-testid="searchSubmit">
                    検索
                  </Button>
                </ListItem>
              </WordSearchForm>
            </ListItem>
          </List>
          <Divider />
          <List>
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
