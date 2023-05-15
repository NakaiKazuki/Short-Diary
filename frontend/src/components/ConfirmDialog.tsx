import { FC } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import styled from "styled-components";

// components
import { BaseButton } from "./shared_style";

// types
import { IConfirmDialogProps as IProps } from "../types/components";

// css
const ConfirmationButton = styled(BaseButton)`
  border-radius: 0.25rem;
  font-size: 1rem;
  height: 2.2rem;
  padding: 0 1rem;
`;

const CloseButton = styled(ConfirmationButton)`
  background-color: white;
  border: 0.0125rem solid limegreen;
  color: limegreen;
  :hover {
    background-color: limegreen;
    color: white;
  }
`;

const DeleteButton = styled(ConfirmationButton)`
  background-color: white;
  border: 0.0125rem solid red;
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
      <DialogTitle sx={{ fontWeight: "bold" }} data-testid="confirmDialogTitle">{title}</DialogTitle>
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
