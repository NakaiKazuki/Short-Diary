import React, { VFC } from 'react';
import { DialogActions, DialogTitle} from '@material-ui/core';

// components
import { FormDialog, FormSubmit, FormItem } from './Forms/Users';

// 型
interface LoginDialogProps {
  isOpen: boolean;
  email: string;
  password: string;
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
    <FormDialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      data-testid="loginDialog"
    >
    <DialogTitle>ログイン</DialogTitle>

      <FormItem
        label="Email"
        type="email"
        placeholder="メールアドレス"
        value={email}
        data-testid="emailArea"
      />

      <FormItem
        label="Password"
        type="password"
        placeholder="パスワード"
        value={password}
        data-testid="passwordArea"
      />

      <DialogActions>
        <FormSubmit
          onClick={() => onClickLogin()}
          data-testid="formSubmit"
        >
          Login!
        </FormSubmit>
      </DialogActions>
    </FormDialog>
  );
}
