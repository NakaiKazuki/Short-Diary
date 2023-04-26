import "@testing-library/jest-dom";
import { render, cleanup } from "@testing-library/react";
import { CustomGallery } from "../../components/CustomGallery";
import { el } from "../helpers";

afterEach(cleanup);

import diaryPicture from "../../images/sample/diary.png";

const items = [{ original: diaryPicture }];

describe("CustomGallery コンポーネント", () => {
  const setup = () => render(<CustomGallery items={items} />);

  describe("要素の表示確認", () => {
    it("CustomGallery", () => {
      setup();
      expect(el("customGallery")).toBeTruthy();
    });
  });
});
