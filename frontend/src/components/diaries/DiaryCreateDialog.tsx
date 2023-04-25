import { FC } from "react";
import { Dialog, DialogTitle } from '@mui/material';
import styled from "styled-components";

// components
import { FormArea } from "./FromArea";

// types
import { IDiaryCreateDialogProps as IProps } from "../../types/components/diaries";

const FromTitle = styled(DialogTitle)`
  text-align: center;
  color: limegreen;
  font-weight: bolder;
`;

export const DiaryCreateDialog: FC<IProps> = ({
  isOpen,
  control,
  errors,
  resultErrors,
  onSubmitText,
  isDisabled,
  contentCount,
  dateToday,
  setFileName,
  onSubmit,
  onFileChange,
  onClose,
  register,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      data-testid="diaryCreateDialog"
    >
      <FromTitle data-testid="diaryCreateDialogTitle">日記作成</FromTitle>
      <FormArea
        control={control}
        errors={errors}
        register={register}
        resultErrors={resultErrors}
        onSubmitText={onSubmitText}
        isDisabled={isDisabled}
        contentCount={contentCount}
        defaultDate={dateToday}
        defaultTag={""}
        defaultContent={""}
        defaultmovie_source={""}
        setFileName={setFileName}
        onSubmit={onSubmit}
        onFileChange={onFileChange}
      />
    </Dialog>
  );
};
