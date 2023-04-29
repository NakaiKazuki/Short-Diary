import { render, cleanup } from "@testing-library/react";
import { AnimatedSection } from "../../components/AnimatedSection";
import { createIntersectionObserver, el } from "../helpers";
import testPicture from "../../images/sample/diary.png";

afterEach(cleanup);
createIntersectionObserver();

describe("AnimatedSection コンポーネント", () => {
  const setup = () =>
    render(
      <AnimatedSection>
        <img src={testPicture} />
      </AnimatedSection>
    );

  it("AnimatedSectionがある", () => {
    setup();
    expect(el("animatedSection")).toBeTruthy();
  });
});
