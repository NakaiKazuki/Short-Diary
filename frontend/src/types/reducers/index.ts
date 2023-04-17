export interface ISubmitInitialState {
  postState: string;
}

export interface ISubmitActionTypes {
  POST_INITIAL: "INITIAL";
  POSTING: "POSTING";
  POST_SUCCESS: "POST_SUCCESS";
}

export interface ISubmitAction {
  type: "INITIAL" | "POSTING" | "POST_SUCCESS";
}

export interface IAboutInitialState {
  title: string;
  jsxElement: JSX.Element;
}

export interface IAboutActionTypes {
  PROFILE: "プロフィール他";
  TECHNOLOGY: "使用技術一覧";
  FUNCTION: "機能その他";
}

export interface IAboutAction {
  title: string;
}
