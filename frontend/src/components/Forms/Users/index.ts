import { DialogTitle, TextField} from '@material-ui/core';
import styled from 'styled-components';

// components
import { BaseButton } from '../../shared_style';


export const FormTitle = styled(DialogTitle)`
  margin: 2% 0 0.5% 2%;
`;

// ユーザーが入力欄
export const FormItem = styled(TextField)`
  margin:0 10% 1rem 10%;
`;

// 送信ボタン
export const FormSubmit = styled(BaseButton)`
  background-color: royalblue;
  color: white;
  border-style: none;
  margin: 1.5rem 9%;
  width: 100%;
  height: 4vh;
`;
