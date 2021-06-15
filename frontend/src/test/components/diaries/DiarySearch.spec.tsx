import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DiarySearch } from "../../../components/diaries/DiarySearch";

const el = screen.getByTestId;
afterEach(cleanup);

describe("DiarySearch コンポーネント", () => {
  beforeEach(() => {
    render(<DiarySearch selectedDate={null} onDateChange={jest.fn()} />);
  });

  it("日記検索欄が表示", () => {
    expect(el("diarySearchField")).toBeTruthy();
  });
});
