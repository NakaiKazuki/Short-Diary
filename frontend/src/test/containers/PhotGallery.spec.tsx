import React from "react";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth";
import { PhotoGallery } from "../../containers/PhotoGallery";
import { photoGallery } from "../../urls";

// types
import { IAuthProviderProps as IProviderProps } from "../../types/test";

const el = screen.getByTestId;

afterEach(cleanup);

// ユーザデータ
const currentUser = {
  id: 1,
  name: "test",
  email: "test@example.com",
};

const mockAxios = new MockAdapter(axios);
const result = {
  items: [
    {
      original: "/testurl",
      originalHeight: 512,
      originalWidth: 512,
    },
  ],
};

const emptyResult = {
  items: [],
};

const providerProps = {
  value: {
    currentUser: currentUser,
    setCurrentUser: jest.fn(),
  },
};

const customRender = (ui: JSX.Element, providerProps: IProviderProps) => {
  const routes = [
    {
      path: "/photoGalley",
      element: (
        <AuthContext.Provider {...providerProps}>{ui}</AuthContext.Provider>
      ),
    },
  ];
  const router = createMemoryRouter(routes, {
    initialEntries: ["/photoGalley"],
  });
  return render(<RouterProvider router={router} />);
};

describe("PhotoGalleryコンポーネント", () => {
  afterEach(() => {
    mockAxios.resetHistory();
  });

  const setup = () => customRender(<PhotoGallery />, providerProps);

  describe("Itemがある場合", () => {
    it("PhotoGalleryが表示", async () => {
      mockAxios.onGet(photoGallery).reply(200, result);
      setup();
      await waitFor(() => {
        expect(el("photGallery")).toBeTruthy();
      });
    });
  });

  describe("Itemがない場合", () => {
    it("画像無しメッセージが表示", async () => {
      mockAxios.onGet(photoGallery).reply(200, emptyResult);
      setup();
      await waitFor(() => {
        expect(el("emptyMessage")).toBeTruthy();
      });
    });
  });
});
