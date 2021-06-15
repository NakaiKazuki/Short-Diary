import { VFC } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import styled from "styled-components";

const DatePickerField = styled.div`
  @media screen and (min-width: 481px) {
    float: right;
  }
  @media screen and (max-width: 480px) {
    text-align: center;
  }
`;

// 型
interface IDiarySearchProps {
  selectedDate: null | Date;
  onDateChange(date: Date | null): void;
}

export const DiarySearch: VFC<IDiarySearchProps> = ({
  selectedDate,
  onDateChange,
}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePickerField>
        <KeyboardDatePicker
          margin="normal"
          label="Search..."
          format="yyyy-MM-dd"
          value={selectedDate}
          onChange={onDateChange}
          clearable
          showTodayButton
          data-testid="diarySearchField"
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </DatePickerField>
    </MuiPickersUtilsProvider>
  );
};
