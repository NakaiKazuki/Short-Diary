export interface IProps {
  postState: string;
  onGuestLoginButton(): Promise<void>;
  onSignUpButton(): void;
  onAboutButton(): void;
}
