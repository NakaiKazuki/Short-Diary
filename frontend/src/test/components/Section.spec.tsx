import "@testing-library/jest-dom";
import { render, cleanup } from "@testing-library/react";
import { Section } from "../../components/Section";
import { createObserver, el } from "../helpers";
import testPicture from "../../images/sample/diary.png";

afterEach(cleanup);
createObserver();

describe("Section コンポーネント", () => {
  const setup = () =>
    render(
      <Section>
        <img src={testPicture} />
      </Section>
    );

  it("Pagenation欄がある", () => {
    setup();
    expect(el("section")).toBeTruthy();
  });
});
