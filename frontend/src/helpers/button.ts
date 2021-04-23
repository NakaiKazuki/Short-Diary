// responses
import { REQUEST_STATE } from '../constants';

// apiとの通信状況に応じてボタンのラベルを変更する
export const onSubmitText = (postState: string, defaultText: string): string => {
  switch (postState) {
    case REQUEST_STATE.LOADING:
      return '送信中...';
    case REQUEST_STATE.OK:
      return '送信完了!';
    default:
      return defaultText;
  };
};

// 送信中とエラーなく送信完了した場合はtrueを返す
export const isDisabled = (postState: string): boolean =>
  postState === REQUEST_STATE.LOADING || postState === REQUEST_STATE.OK
;