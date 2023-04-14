import {
  IAboutActionTypes as IActionTypes,
  IAboutInitialState as IInitialState,
  IAboutAction as IAction,
} from "../types/reducers";
import { Profile } from "../components/aboutDiarlog/Profile";
import { Tools } from "../components/aboutDiarlog/Tools";
import { FeatureList } from "../components/aboutDiarlog/FeatureList";
export const initialState: IInitialState = {
  title: "プロフィール",
  jsxElement: <Profile />,
};

const aboutActionTypes: IActionTypes = {
  PROFILE: "プロフィール",
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
        title: "プロフィール",
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
