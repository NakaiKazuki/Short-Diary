import "@testing-library/jest-dom";
import { render, cleanup } from "@testing-library/react";
import { FormSubmit } from "../../../components/users/forms";
import { el } from "../../helpers";

afterEach(cleanup);

describe("formSubmit コンポーネント", () => {
  it("Submitボタン 活性時", () => {
    render(<FormSubmit isDisabled={false} onSubmitText={"NotDisabled"} />);
    const formSubmit = el("formSubmit");

    // 表示確認
    expect(formSubmit).toHaveAttribute("type", "submit");

    // 受け取ったプロパティによって表示内容が変わる
    expect(formSubmit).toHaveTextContent("NotDisabled");

    // 受け取ったプロパティによって状態が変わる
    expect(formSubmit).not.toBeDisabled();
  });

  it("Submitボタン 非活性時", () => {
    render(<FormSubmit isDisabled={true} onSubmitText={"Disabled"} />);
    const formSubmit = el("formSubmit");

    // 表示確認
    expect(formSubmit).toHaveAttribute("type", "submit");

    // 受け取ったプロパティによって表示内容が変わる
    expect(formSubmit).toHaveTextContent("Disabled");

    // 受け取ったプロパティによって状態が変わる
    expect(formSubmit).toBeDisabled();
  });
});
