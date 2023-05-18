import { render, cleanup } from "@testing-library/react";
import { AnimatedSection } from "../../components/AnimatedSection";
import { createIntersectionObserver, el } from "../helpers";

afterEach(cleanup);
createIntersectionObserver();

const testPicture = "images/test.png";

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
