import React, { VFC } from 'react';
import { DialogActions, DialogTitle} from '@material-ui/core';

// components
import { FormDialog, FormSubmit, FormItem } from './Forms/Users';

// 型
interface LoginDialogProps {
  isOpen: boolean;
  onClose(): void;
  onClickLogin(): void;
}

export const LoginDialog: VFC<LoginDialogProps> = ({
  isOpen,
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
        data-testid="emailArea"
      />

      <FormItem
        label="Password"
        type="password"
        placeholder="パスワード"
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
