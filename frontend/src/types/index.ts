// 型
declare global {
  interface Window {
    gtag: (
      key: string,
      trackingId: string,
      config: {
        page_title: string;
        page_path: string;
        // send_to: string;
        // page_location: string;
      }
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
  screenName?: string;
}
