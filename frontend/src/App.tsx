import { FC } from "react";

// cotexts
import { AuthProvider } from "./contexts/Auth";

// components
import { InnerRoute } from "./routes/InnerRoute";
const App: FC = () => {
  return (
    <AuthProvider>
      <InnerRoute />
    </AuthProvider>
  );
};

export default App;
