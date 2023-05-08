import { render, cleanup, waitFor } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { authAtom } from "../../atoms/Auth";
import { PhotoGallery } from "../../containers/PhotoGallery";
import { photoGallery } from "../../urls";
import { el } from "../helpers";

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

const customRender = (ui: JSX.Element) => {
  const routes = [
    {
      path: "/",
      element: ui,
    },
  ];
  const router = createMemoryRouter(routes);
  return render(
    <RecoilRoot
      initializeState={({ set }) => {
        set(authAtom, currentUser);
      }}
    >
      <RouterProvider router={router} />
    </RecoilRoot>
  );
};

describe("PhotoGalleryコンポーネント", () => {
  afterEach(() => {
    mockAxios.resetHistory();
  });

  const setup = () => customRender(<PhotoGallery />);

  describe("Itemがある場合", () => {
    it("PhotoGalleryが表示", async () => {
      mockAxios.onGet(photoGallery).reply(200, result);
      setup();
      await waitFor(() => {
        expect(el("customGallery")).toBeTruthy();
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
