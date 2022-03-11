import { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";

// routes
import { InnnerComponent } from "./routes/InnerComponent";
// cotexts
import { AuthProvider } from "./contexts/Auth";
import { MessageProvider } from "./contexts/Message";
// components
import { Header } from "./containers/Header";
import { Footer } from "./containers/Footer";

function App() {
  return (
    <Fragment>
      <Router>
        <AuthProvider>
          <MessageProvider>
            <Header />
            <InnnerComponent />
          </MessageProvider>
        </AuthProvider>
      </Router>
      <Footer />
    </Fragment>
  );
}

export default App;
