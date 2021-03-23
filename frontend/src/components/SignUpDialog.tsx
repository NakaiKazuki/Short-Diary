import React, { VFC } from 'react';
import { Dialog, DialogActions, DialogTitle} from '@material-ui/core';

// components
import { FormSubmit, FormItem } from './Forms/Users';

// 型
interface SignupDialogProps {
  isOpen: boolean;
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  onClose(): void;
  onClickSignUp(): void;
}

export const SignupDialog: VFC<SignupDialogProps> = ({
  isOpen,
  name,
  email,
  password,
  passwordConfirmation,
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
        value={name}
        data-testid="nameArea"
      />

      <FormItem
        label="Email"
        type="email"
        placeholder="メールアドレス（例：email@example.com）"
        value={email}
        data-testid="emailArea"
      />

      <FormItem
        label="Password"
        type="password"
        placeholder="パスワード（6文字以上）"
        value={password}
        data-testid="passwordArea"
      />

      <FormItem
        label="確認用Password"
        type="password"
        placeholder="パスワード（再入力）"
        value={passwordConfirmation}
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
