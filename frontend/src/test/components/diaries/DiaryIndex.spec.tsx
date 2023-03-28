import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DiaryIndex } from "../../../components/diaries";
import { el } from "../../helpers";

afterEach(cleanup);

const testString = (count: number): string => {
  return "0123456789".repeat(count);
};

const date = new Date().toISOString().split("T")[0];
const testTContent: string = testString(6);
const diaries = [
  {
    id: 1,
    date: date,
    content: "Test Content",
    tag_list: [],
    movie_source: undefined,
    picture_url: undefined,
    user_id: 1,
  },
  {
    id: 2,
    date: date,
    content: testTContent,
    tag_list: [],
    movie_source: undefined,
    picture_url: "/testurl",
    user_id: 1,
  },
];

describe("DiaryIndex コンポーネント", () => {
  const setup = () =>
    render(<DiaryIndex diaries={diaries} onOpenDiaryDialog={jest.fn()} />);

  it("受け取るデータを元に表示", () => {
    setup();
    diaries.forEach((obj, index) => {
      // 配列の要素数だけ表示
      expect(el(`diary-${index}`)).toBeTruthy();

      // 配列要素のdateプロパティを表示
      expect(el(`diaryDate-${index}`)).toHaveTextContent(obj.date);

      // 配列要素のcontentプロパティを表示 40文字を超える場合は超えた文字を省略
      expect(el(`diaryContent-${index}`)).toHaveTextContent(
        obj.content.length <= 40
          ? obj.content
          : `${obj.content.slice(0, 40)}......`
      );
    });
  });
});
