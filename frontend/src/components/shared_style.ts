import styled from 'styled-components';

// ボタンの元となるコンポーネント
export const BaseButton = styled.button`
  cursor: pointer;
  border-radius: .25rem;
  :hover {
    opacity: 0.9;
  }
  :focus {
    outline: 0;
  }
  :disabled {
    background-color: gray;
    color: white;
  }
`;

// // 角丸なボタン
// export const RoundButton = styled(BaseButton)`
//   width: 2.7rem;
//   height: 2.7rem;
//   border-radius: 50%;
//   border: none;
//   background-color: royalblue;
// `;