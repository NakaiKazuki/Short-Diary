export interface IProps {
  postState: string;
  onGuestLoginButton(): Promise<void>;
  onSignUpOpenButton(): void;
  onAboutOpenButton(): void;
}
