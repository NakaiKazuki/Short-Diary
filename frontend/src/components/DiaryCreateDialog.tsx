import React, { VFC } from 'react';
import { Dialog, DialogTitle, TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';
import { BaseButton } from './shared_style';

const FormItemWrapper = styled.div`
  margin-top: 1rem;
`;
const FormWrapper = styled.form`
  padding: 0 10% 5% 10%;
`;

const FromTitle = styled(DialogTitle)`
  text-align: center;
  color: royalblue;
  font-weight: bolder;
`;

const FormErrorMessage = styled.p`
  margin: .6rem auto auto auto;
  color: red;
  font-size: .9rem;
`;

const ContentCount = styled.span`
  float: right;
  font-size: 1rem;
`;


const FormSubmit = styled(BaseButton)`
  margin-top: 2rem;
  background-color: royalblue;
  color: white;
  border-style: none;
  width: 100%;
  height: 3rem;
  font-size: 1.1rem;
`;

// 型

// エラーメッセージ
interface IApiErrors {
  date?: Array<string>;
  content?: Array<string>;
  picture?: Array<string>;
  full_messages: Array<string>;
}


interface IDiaryCreateDialogProps {
  isOpen: boolean;
  control: any;
  errors: any;
  contentCount: number;
  apiErrors?: IApiErrors;
  handleSubmit(): void;
  dateToday(): string;
  isDisabled(): boolean;
  onSubmitLabel(): string;
  onClose(): void;
}

export const DiaryCreateDialog:VFC<IDiaryCreateDialogProps> = ({
  isOpen,
  control,
  errors,
  apiErrors,
  onClose,
  handleSubmit,
  dateToday,
  isDisabled,
  onSubmitLabel,
  contentCount
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth={"sm"}
      fullWidth
    >
      <FromTitle>日記作成</FromTitle>
      <FormWrapper onSubmit={handleSubmit}>
      <FormItemWrapper>
        {apiErrors?.date?.map((message: string, index: number) =>
          <FormErrorMessage key={`date-${index}`}>{`日付${message}`}</FormErrorMessage>
        )}
        <Controller
          name={"date"}
          control={control}
          defaultValue={dateToday()}
          rules={{ required: true }}
          as={
            <TextField
              label="Date"
              type={"date"}
            />
           }
        />
        </FormItemWrapper>

        <FormItemWrapper>
          {errors?.content &&
            <FormErrorMessage>1文字以上、200文字以内で入力してください</FormErrorMessage>
          }
          {apiErrors?.content?.map((message: string, index: number) =>
            <FormErrorMessage key={`content-${index}`}>{`日記内容${message}`}</FormErrorMessage>
          )}
          <Controller
            name={"content"}
            control={control}
            defaultValue={""}
            rules={{ required: true , maxLength: 200 }}
            as={
              <TextField
                label="Content"
                type={"textarea"}
                autoFocus={true}
                rows="8"
                placeholder="200文字以内で日記の内容を入力してください"
                multiline
                fullWidth
                helperText = {<ContentCount>{contentCount}/200</ContentCount>}
              />
            }
          />
          {apiErrors?.picture?.map((message: string, index: number) =>
            <FormErrorMessage key={`写真-${index}`}>{`日記内容${message}`}</FormErrorMessage>
          )}
          <Controller
            name={"picture"}
            control={control}
            defaultValue={""}
            as={
              <input
                type={"file"}
              />
            }
          />
        </FormItemWrapper>

        <FormSubmit
          type="submit"
          disabled={isDisabled()}
        >
          {onSubmitLabel()}
        </FormSubmit>
      </FormWrapper>
    </Dialog>
  );
}