import { FC, Fragment } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { TextField } from "@material-ui/core";
import { Box, SwipeableDrawer, List, Divider, ListItem } from "@mui/material";
import { Controller, Control } from "react-hook-form";
import DateFnsUtils from "@date-io/date-fns";
import styled from "styled-components";

// components
import { BaseButton } from "../shared_style";

const WordSearchForm = styled.form`
  width: 100%;
`;

const Submit = styled.button`
  display: none;
`;

const ClearButton = styled(BaseButton)`
  margin-top: 1rem;
  float: right;
  color: royalblue;
  background-color: white;
  height: 1.7rem;
  width: 6rem;
  border: 0.0125rem solid royalblue;
  letter-spacing: 0.2rem;
  font-size: 0.95rem;
  :hover {
    opacity: 0.8;
    background-color: royalblue;
    color: white;
  }
`;
// 型
type TPicture = Array<{ data: string; name: string }>;
interface IFormValues {
  date: string;
  tag_list: string | undefined;
  content: string;
  picture: TPicture | undefined;
  movie_source: string;
  searchWord: string | undefined;
}

interface IDiarySearchDrawerProps {
  control: Control<IFormValues>;
  selectedDate: null | Date;
  isOpenDrawer: boolean;
  onOpenButton(open: boolean): React.ReactEventHandler;
  onClearButton(): void;
  onDateChange(date: Date | null): void;
  onSubmit(): void;
}

export const DiarySearchDrawer: FC<IDiarySearchDrawerProps> = ({
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
                  format="yyyy年MM月dd日"
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
                <Submit type="submit" />
              </WordSearchForm>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem>
              <ClearButton onClick={onClearButton} data-testid="clearButton">
                Clear
              </ClearButton>
            </ListItem>
          </List>
        </Box>
      </SwipeableDrawer>
    </Fragment>
  );
};
