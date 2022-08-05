import { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";

// routes
import { InnnerComponent } from "./routes/InnerComponent";

// cotexts
import { AuthProvider } from "./contexts/Auth";
import { MessageProvider } from "./contexts/Message";
import { DrawerProvider } from "./contexts/Drawer";
import { ContactProvider } from "./contexts/Contact";

// components
import { Header } from "./containers/Header";
import { Message } from "./containers/Message";
import { Footer } from "./containers/Footer";
import { Drawer } from "./containers/Drawer";
import { Contact } from "./containers/Contact";

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
              <ContactProvider children={<Contact />} />
              <InnnerComponent />
            </MessageProvider>
          </DrawerProvider>
        </AuthProvider>
      </Router>
      <ContactProvider children={<Footer />} />
    </Fragment>
  );
}

export default App;
