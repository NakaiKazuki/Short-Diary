// 型
declare global {
  interface Window {
    gtag?: (
      key: string,
      trackingId: string,
      config: { page_path: string; page_title: string }
    ) => void;
  }

  interface ICurrentUser {
    id: number;
    name: string;
    email: string;
  }

  interface IHeaders {
    "access-token": string;
    client: string;
    uid: string;
  }
}

export interface IHeadContext {
  title: string;
}
