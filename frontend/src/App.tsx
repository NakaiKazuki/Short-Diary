import { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";

// routes
import { InnnerComponent } from "./routes/InnerComponent";
// cotexts
import { AuthProvider } from "./contexts/Auth";
import { MessageProvider } from "./contexts/Message";
import { DrawerProvider } from "./contexts/Drawer";
// components
import { Header } from "./containers/Header";
import { Message } from "./containers/Message";
import { Footer } from "./containers/Footer";
import { Drawer } from "./containers/Drawer";

function App() {
  return (
    <Fragment>
      <Router>
        <AuthProvider>
          <DrawerProvider>
            <MessageProvider>
              <Header />
              <Message />
              <Drawer />
              <InnnerComponent />
            </MessageProvider>
          </DrawerProvider>
        </AuthProvider>
      </Router>
      <Footer />
    </Fragment>
  );
}

export default App;
