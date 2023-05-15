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

// icons
import { SearchIcon, CloseIcon } from "../icon";

// types
import { IDiarySearchDrawerProps as IProps } from "../../types/components/diaries";

// css
const WordSearchForm = styled.form`
  margin-top: 1rem;
  width: 100%;
`;

const StyledButton = styled(BaseButton)`
  border: 0.0125rem solid limegreen;
  float: right;
  font-size: 1.2rem;
  height: 3rem;
  letter-spacing: 0.2rem;
  margin: 1.3rem 0;
  width: 100%;

  :hover {
    opacity: 0.8;
  }
`;
const ActionButton = styled(StyledButton)`
  background-color: white;
  color: limegreen;

  :hover {
    background-color: limegreen;
    color: white;
  }
`;

const CloseButton = styled(StyledButton)`
  background-color: limegreen;
  color: white;

  :hover {
    background-color: white;
    color: limegreen;
  }
`;

const StyledIcon = styled(SearchIcon)`
  margin-right: 0.6rem;
`;

const styles = {
  "& .MuiPickersLayout-toolbar": {
    display: "none",
  },
  "& .MuiPickersLayout-actionBar": {
    display: "none",
  },
};

const style = {
  ".css-1cafy48-MuiPickersSlideTransition-root-MuiDayCalendar-slideTransition":
    {
      minHeight: "192px",
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
                  sx={style}
                />
              </LocalizationProvider>
            </ListItem>
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
                <ActionButton type="submit" data-testid="searchSubmit">
                  <StyledIcon />
                  検索
                </ActionButton>
              </WordSearchForm>
            </ListItem>
            <Divider />
            <ListItem>
              <ActionButton onClick={onClearButton} data-testid="clearButton">
                Clear
              </ActionButton>
            </ListItem>
            <Divider />
            <ListItem>
              <CloseButton
                onClick={onOpenButton(false)}
                data-testid="closeButton"
              >
                <CloseIcon />
              </CloseButton>
            </ListItem>
            <Divider />
          </List>
        </Box>
      </SwipeableDrawer>
    </Fragment>
  );
};
