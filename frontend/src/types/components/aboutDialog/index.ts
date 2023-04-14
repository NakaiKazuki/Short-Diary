import { IAboutInitialState as IState } from "../../reducers";

export interface IInitialState {
  title: string;
  jsxElement: JSX.Element;
}

export interface IAboutProps {
  isOpen: boolean;
  state: IState;
  handleClose(): void;
  onCategory(title: string): void;
}
