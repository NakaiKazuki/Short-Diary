import {
  IAboutActionTypes as IActionTypes,
  IAboutInitialState as IInitialState,
  IAboutAction as IAction,
} from "../types/reducers";

import { Profile } from "../components/about/Profile";
import { Tools } from "../components/about/Tools";
import { FeatureList } from "../components/about/FeatureList";

export const initialState: IInitialState = {
  title: "プロフィール他",
  jsxElement: <Profile />,
};

const aboutActionTypes: IActionTypes = {
  PROFILE: "プロフィール他",
  TECHNOLOGY: "使用技術一覧",
  FUNCTION: "機能その他",
};

export const aboutReducer = (
  state: IInitialState,
  action: IAction
): IInitialState => {
  switch (action.title) {
    case aboutActionTypes.PROFILE:
      return {
        ...state,
        title: "プロフィール他",
        jsxElement: <Profile />,
      };
    case aboutActionTypes.TECHNOLOGY:
      return {
        ...state,
        title: "使用技術一覧",
        jsxElement: <Tools />,
      };
    case aboutActionTypes.FUNCTION:
      return {
        ...state,
        title: "機能その他",
        jsxElement: <FeatureList />,
      };
    default:
      throw new Error();
  }
};
