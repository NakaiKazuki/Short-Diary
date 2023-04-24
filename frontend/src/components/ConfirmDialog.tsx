import { FC } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import styled from "styled-components";

// components
import { BaseButton } from "./shared_style";

// types
import { IConfirmDialogProps as IProps } from "../types/components";

// css
const ConfirmationButton = styled(BaseButton)`
  height: 2.2rem;
  padding: 0 1rem;
  font-size: 1rem;
  border-radius: 0.25rem;
`;

const CloseButton = styled(ConfirmationButton)`
  border: 0.0125rem solid limegreen;
  background-color: white;
  color: limegreen;
  :hover {
    background-color: limegreen;
    color: white;
  }
`;

const DeleteButton = styled(ConfirmationButton)`
  border: 0.0125rem solid red;
  background-color: white;
  color: red;
  :hover {
    background-color: red;
    color: white;
  }
`;

export const ConfirmDialog: FC<IProps> = ({
  isOpen,
  title,
  contentText,
  obj,
  onDelete,
  onClose,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      data-testid="confirmDialog"
    >
      <DialogTitle data-testid="confirmDialogTitle">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText data-testid="confirmDialogContent">
          {contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <DeleteButton
          type="button"
          onClick={() => onDelete(obj)}
          data-testid="deleteButton"
        >
          削除
        </DeleteButton>
        <CloseButton
          type="button"
          onClick={onClose}
          data-testid="confirmDialogCloseButton"
        >
          閉じる
        </CloseButton>
      </DialogActions>
    </Dialog>
  );
};
