import { FC } from "react";
import { RecoilRoot } from "recoil";

// components
import { InnerRoute } from "./routes/InnerRoute";
const App: FC = () => {
  return (
    <RecoilRoot>
      <InnerRoute />
    </RecoilRoot>
  );
};

export default App;
