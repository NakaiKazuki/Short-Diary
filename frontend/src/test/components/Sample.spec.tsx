import "@testing-library/jest-dom";
import { render, cleanup } from "@testing-library/react";
import { Sample } from "../../components/Sample";
import { el, createIntersectionObserver } from "../helpers";

createIntersectionObserver();
afterEach(cleanup);

describe("Sample コンポーネント", () => {
  const setup = () => render(<Sample />);

  describe("要素の表示確認", () => {
    it("Sample", () => {
      setup();
      expect(el("sample")).toContainElement(el("customGallery"));
      expect(el("sample")).toContainElement(el("titleDiary"));
      expect(el("sample")).toContainElement(el("titlePhotoGallery"));
      expect(el("sample")).toContainElement(el("overViewDiary"));
      expect(el("sample")).toContainElement(el("overViewPhotoGallery"));
    });
  });
});
