export interface IInitialState {
  postState: string;
}

export interface ISubmitActionTypes {
  POST_INITIAL: "INITIAL";
  POSTING: "POSTING";
  POST_SUCCESS: "POST_SUCCESS";
}

export interface IAction {
  type: "INITIAL" | "POSTING" | "POST_SUCCESS";
}
