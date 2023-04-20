import { render, cleanup } from "@testing-library/react";
import { AnimatedSection } from "../../components/AnimatedSection";
import { createObserver, el } from "../helpers";
import testPicture from "../../images/sample/diary.png";

afterEach(cleanup);
createObserver();

describe("AnimatedSection コンポーネント", () => {
  const setup = () =>
    render(
      <AnimatedSection>
        <img src={testPicture} />
      </AnimatedSection>
    );

  it("Pagenation欄がある", () => {
    setup();
    expect(el("animatedSection")).toBeTruthy();
  });
});
