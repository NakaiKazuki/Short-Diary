import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DiaryIndex } from "../../../components/diaries";

const date = new Date().toISOString().split("T")[0];
const testTContent: string =
  "A123456789B123456789C123456789D123456789E123456789F123456789";
const diaries = [
  {
    id: 1,
    date: date,
    content: "Test Content",
    tag_list: [],
    picture_url: null,
    user_id: 1,
  },
  {
    id: 2,
    date: date,
    content: testTContent,
    picture_url: "/testurl",
    tag_list: [],
    user_id: 1,
  },
];

const el = screen.getByTestId;

afterEach(cleanup);

describe("DiaryIndex コンポーネント", () => {
  const setup = () =>
    render(<DiaryIndex diaries={diaries} onOpenDiaryDialog={jest.fn()} />);

  it("プロパティで受け取るデータを元に表示", () => {
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
