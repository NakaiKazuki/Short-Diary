import React, { VFC, ChangeEvent } from 'react';
import { Dialog, DialogActions} from '@material-ui/core';

// components
import { FormTitle, FormItem, FormSubmit } from './Forms/Users';

// 型
interface formItemProps{
  value: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
}

interface SignupDialogProps {
  isOpen: boolean;
  name: formItemProps;
  email: formItemProps;
  password: formItemProps;
  passwordConfirmation: formItemProps;
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

    <FormTitle>新規登録</FormTitle>
      <FormItem
        autoFocus
        label="Name"
        type="text"
        placeholder="名前"
        {...name}
        data-testid="nameArea"
      />

      <FormItem
        label="Email"
        type="email"
        placeholder="メールアドレス（例：email@example.com）"
        {...email}
        data-testid="emailArea"
      />

      <FormItem
        label="Password"
        type="password"
        placeholder="パスワード（6文字以上）"
        {...password}
        data-testid="passwordArea"
      />

      <FormItem
        label="確認用Password"
        type="password"
        placeholder="パスワード（再入力）"
        {...passwordConfirmation}
        data-testid="passwordConfirmationArea"
       />

      <DialogActions>
        <FormSubmit
          onClick={() => onClickSignUp()}
          value="この内容で登録"
          data-testid="formSubmit"
        />
      </DialogActions>
    </Dialog>
  );
}
