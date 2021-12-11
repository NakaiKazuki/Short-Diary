import { VFC, Fragment } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";
import DateFnsUtils from "@date-io/date-fns";
import styled from "styled-components";

// components
import { BaseButton } from "../shared_style";

const DatePickerWrapper = styled.div`
  @media screen and (min-width: 481px) {
    margin: 0 0 0 70vw;
  }
  @media screen and (max-width: 480px) {
    text-align: center;
  }
`;

const WordSearchForm = styled.form`
  @media screen and (min-width: 481px) {
    margin: 0 0 0 70vw;
  }
  @media screen and (max-width: 480px) {
    text-align: center;
  }
`;

const Submit = styled.button`
  display: none;
`;

const ClearButton = styled(BaseButton)`
  margin-top: 1rem;
  float: right;
  color: white;
  background-color: royalblue;

  height: 1.7rem;
  width: 6rem;
  border-style: none;
  letter-spacing: 0.2rem;
  font-size: 0.95rem;
`;
// 型
interface IDiarySearchProps {
  control: any;
  selectedDate: null | Date;
  onClearButton(): void;
  onDateChange(date: Date | null): void;
  onSubmit(): void;
}

export const DiarySearch: VFC<IDiarySearchProps> = ({
  control,
  selectedDate,
  onClearButton,
  onSubmit,
  onDateChange,
}) => {
  return (
    <Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePickerWrapper>
          <KeyboardDatePicker
            fullWidth
            margin="normal"
            label="Search by Date"
            format="yyyy年MM月dd日"
            value={selectedDate}
            onChange={onDateChange}
            clearable
            showTodayButton
            data-testid="diarySearchField"
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            inputProps={{
              disabled: true,
            }}
          />
        </DatePickerWrapper>
      </MuiPickersUtilsProvider>
      <WordSearchForm onSubmit={onSubmit}>
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
      <ClearButton onClick={onClearButton}>Clear</ClearButton>
    </Fragment>
  );
};
