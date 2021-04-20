import React, { VFC } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import styled from 'styled-components';

// components
import { BaseButton } from './shared_style';
// css
const ConfirmationButton = styled(BaseButton)`
  height: 2.2rem;
  padding: 0 1rem;
  font-size: 1rem;
  border-radius: .25rem;
`;

const CloseButton = styled(ConfirmationButton)`
  border: .0125rem solid royalblue;
  background-color: white;
  color: royalblue;
  :hover{
    background-color: royalblue;
    color: white;
  }
`;

const DeleteButton = styled(ConfirmationButton)`
border: .0125rem solid red;
background-color: white;
color: red;
:hover{
  background-color: red;
  color: white;
}
`;

// 型
interface IDiary {
  id: number;
  date: string;
  content: string;
  picture_url: string;
  user_id: number;
}

interface IConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  contentText: string;
  diary: IDiary;
  onDiaryDelete(diary: IDiary): void;
  onClose(): void;
}

export const ConfirmationDialog:VFC<IConfirmationDialogProps> = ({
  isOpen,
  title,
  contentText,
  diary,
  onDiaryDelete,
  onClose,
}) => {
  return(
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <DeleteButton onClick={() => onDiaryDelete(diary)}>
          削除
        </DeleteButton>
        <CloseButton onClick={onClose}>
          閉じる
        </CloseButton>
      </DialogActions>
    </Dialog>
  );
}