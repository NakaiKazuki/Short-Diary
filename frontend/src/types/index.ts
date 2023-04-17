// 型
declare global {
  interface ICurrentUser {
    id: number;
    name: string;
    email: string;
  }
  interface IHeaders {
    "access-token": string;
    client: string;
    uid: string;
    [key: string]: string;
  }
}
export interface IHeadProps {
  title: string;
  type?: string;
}
