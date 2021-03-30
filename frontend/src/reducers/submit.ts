import { REQUEST_STATE } from "../constants";

// 型
interface IInitialState {
  postState: string;
}

interface ISubmitActionTypes {
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

export const submitActionTypes: ISubmitActionTypes = {
  POST_INITIAL: "INITIAL",
  POSTING: "POSTING",
  POST_SUCCESS: "POST_SUCCESS",
};

export const submitReducer = (state: IInitialState, action: IAction ): IInitialState => {
  switch (action.type) {
    case submitActionTypes.POST_INITIAL:
      return {
        ...state,
        postState: REQUEST_STATE.INITIAL,
      };
    case submitActionTypes.POSTING:
      return {
        ...state,
        postState: REQUEST_STATE.LOADING,
      };
    case submitActionTypes.POST_SUCCESS:
      return {
        ...state,
        postState: REQUEST_STATE.OK,
      };
    default:
      throw new Error();
  }
};