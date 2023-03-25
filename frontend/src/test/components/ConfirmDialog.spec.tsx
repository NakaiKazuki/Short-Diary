import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ConfirmDialog } from "../../components/ConfirmDialog";
import { dateToday } from "../../helpers";
import { el } from "../helpers";

afterEach(cleanup);

const diary = {
  id: 1,
  date: dateToday(),
  content: "Test Text",
  tag_list: [],
  picture_url: undefined,
  movie_source: undefined,
  user_id: 1,
};

describe("ConfirmDialog コンポーネント", () => {
  const setup = () =>
    render(
      <ConfirmDialog
        isOpen={true}
        title={"Test Title"}
        contentText={diary.content}
        obj={diary}
        onDelete={jest.fn()}
        onClose={jest.fn()}
      />
    );

  describe("要素の表示確認", () => {
    it("DialogTitle", () => {
      setup();
      // プロパティによって内容が変わる
      expect(el("confirmDialogTitle")).toHaveTextContent("Test Title");
    });

    it("DialogContentText", () => {
      setup();
      // プロパティによって内容が変わる
      expect(el("confirmDialogContent")).toHaveTextContent(diary.content);
    });

    it("DialogCloseButton", () => {
      setup();

      expect(el("confirmDialogCloseButton")).toHaveAttribute("type", "button");
      expect(el("confirmDialogCloseButton")).toHaveTextContent("閉じる");
    });

    it("deleteButton", () => {
      setup();

      expect(el("deleteButton")).toHaveAttribute("type", "button");
      expect(el("deleteButton")).toHaveTextContent("削除");
    });
  });
});
