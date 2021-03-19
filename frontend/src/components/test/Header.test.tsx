import React from "react";
import "@testing-library/jest-dom";
import { render, screen  } from "@testing-library/react";
import { Header } from '../Header';

describe("Headercomponents", () => {
  test("render Header components", () => {
    render(<Header />);

    screen.debug();
  });
});