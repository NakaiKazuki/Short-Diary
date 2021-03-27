import { REQUEST_STATE } from "../constants";

// 型
interface InitialState {
  postState: string;
}

interface LoginActionTypes {
  POST_INITIAL: string;
  POSTING: string;
  POST_SUCCESS: string;
}

interface Action {
  type: string;
}

export const initialState: InitialState = {
  postState: REQUEST_STATE.INITIAL,
};

export const loginActionTypes: LoginActionTypes = {
  POST_INITIAL: "INITIAL",
  POSTING: "POSTING",
  POST_SUCCESS: "POST_SUCCESS",
};

export const loginReducer = (state:InitialState, action: Action ): InitialState => {
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