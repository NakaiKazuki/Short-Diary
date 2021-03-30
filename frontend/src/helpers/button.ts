// responses
import { REQUEST_STATE } from '../constants';

// 型
type TPostState = string;
type SubmitDisplay = string;

// apiとの通信状況に応じてボタンのラベルを変更する
export const onSubmitLabel = (postState: TPostState, defaultLabel: SubmitDisplay): SubmitDisplay => {
  switch (postState) {
    case REQUEST_STATE.LOADING:
      return "送信中...";
    case REQUEST_STATE.OK:
      return "送信完了!";
    default:
      return defaultLabel;
  };
};

// 送信中とエラーなく送信完了した場合はtrueを返す
export const isDisabled = (postState: TPostState): boolean =>
  postState === REQUEST_STATE.LOADING || postState === REQUEST_STATE.OK
;