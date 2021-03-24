import React, { VFC, ChangeEvent} from 'react';
import { Dialog, DialogActions} from '@material-ui/core';

// components
import { FormTitle, FormItem, FormSubmit } from './Forms/Users';

// 型
interface formInputProps{
  value: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
}

interface LoginDialogProps {
  isOpen: boolean;
  email: formInputProps;
  password: formInputProps;
  onClose(): void;
  onClickLogin(): void;
}

export const LoginDialog: VFC<LoginDialogProps> = ({
  isOpen,
  email,
  password,
  onClickLogin,
  onClose,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      data-testid="loginDialog"
    >
    <FormTitle>ログイン</FormTitle>

      <FormItem
        label="Email"
        type="email"
        placeholder="メールアドレス"
        data-testid="emailArea"
        {...email}
      />
      <FormItem
        label="Password"
        type="password"
        placeholder="パスワード"
        data-testid="passwordArea"
        {...password}
      />
      <DialogActions>
        <FormSubmit
          onClick={() => onClickLogin()}
          value="Login!"
          data-testid="formSubmit"
        />
      </DialogActions>
    </Dialog>
  );
}
