import {
  IAboutActionTypes as IActionTypes,
  IAboutInitialState as IInitialState,
  IAboutAction as IAction,
} from "../types/reducers";

export const initialState: IInitialState = {
  title: "プロフィール",
  jsxElement: <h1>ここにプロフィールコンポーネント</h1>,
};

const aboutActionTypes: IActionTypes = {
  PROFILE: "プロフィール",
  TECHNOLOGY: "使用技術",
  FUNCTION: "機能一覧",
};

export const aboutReducer = (
  state: IInitialState,
  action: IAction
): IInitialState => {
  switch (action.title) {
    case aboutActionTypes.PROFILE:
      return {
        ...state,
        title: "プロフィール",
        jsxElement: <h1>ここにプロフィールコンポーネント</h1>,
      };
    case aboutActionTypes.TECHNOLOGY:
      return {
        ...state,
        title: "使用技術",
        jsxElement: <h1>ここに使用技術コンポーネント</h1>,
      };
    case aboutActionTypes.FUNCTION:
      return {
        ...state,
        title: "機能一覧",
        jsxElement: <h1>ここに機能一覧コンポーネント</h1>,
      };
    default:
      throw new Error();
  }
};
