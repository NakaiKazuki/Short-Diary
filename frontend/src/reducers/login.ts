import { REQUEST_STATE } from "../constants";

// 型
interface IInitialState {
  postState: string;
}

interface ILoginActionTypes {
  POST_INITIAL: string;
  POSTING: string;
  POST_SUCCESS: string;
}

interface IAction {
  type: string;
}

export const initialState: IInitialState = {
  postState: REQUEST_STATE.INITIAL,
};

export const loginActionTypes: ILoginActionTypes = {
  POST_INITIAL: "INITIAL",
  POSTING: "POSTING",
  POST_SUCCESS: "POST_SUCCESS",
};

export const loginReducer = (state: IInitialState, action: IAction ): IInitialState => {
  switch (action.type) {
    case loginActionTypes.POST_INITIAL:
      return {
        ...state,
        postState: REQUEST_STATE.INITIAL,
      };
    case loginActionTypes.POSTING:
      return {
        ...state,
        postState: REQUEST_STATE.LOADING,
      };
    case loginActionTypes.POST_SUCCESS:
      return {
        ...state,
        postState: REQUEST_STATE.OK,
      };
    default:
      throw new Error();
  }
}