import React, { VFC } from 'react';
import { Dialog, DialogActions, DialogTitle} from '@material-ui/core';

// components
import { FormSubmit, FormItem } from './Forms/Users';

// 型
interface SignupDialogProps {
  isOpen: boolean;
  onClose(): void;
  onClickSignUp(): void;
}

export const SignupDialog: VFC<SignupDialogProps> = ({
  isOpen,
  onClickSignUp,
  onClose,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      data-testid="signUpDialog"
    >

    <DialogTitle>新規登録</DialogTitle>
      <FormItem
        autoFocus
        label="Name"
        type="text"
        placeholder="名前"
        data-testid="nameArea"
      />

      <FormItem
        label="Email"
        type="email"
        placeholder="メールアドレス（例：email@example.com）"
        data-testid="emailArea"
      />

      <FormItem
        label="Password"
        type="password"
        placeholder="パスワード（6文字以上）"
        data-testid="passwordArea"
      />

      <FormItem
        label="確認用Password"
        type="password"
        placeholder="パスワード（再入力）"
        data-testid="passwordConfirmationArea"
       />

      <DialogActions>
        <FormSubmit
          onClick={() => onClickSignUp()}
          data-testid="formSubmit"
        >
          この内容で登録
        </FormSubmit>
      </DialogActions>
    </Dialog>
  );
}
