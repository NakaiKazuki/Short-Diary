import { useState ,ChangeEvent } from 'react';

// ユーザーがinputタグに入力した内容を取得
interface returnProps {
  value: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
}

export const useInput = (initialValue: string): returnProps => {
  const [value, set] = useState(initialValue)
  return { value, onChange: (e) => set(e.target.value) }
};