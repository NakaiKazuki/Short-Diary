import { BrowserRouter } from "react-router-dom";

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
    <ContactProvider>
      <BrowserRouter>
        <AuthProvider>
          <DrawerProvider>
            <MessageProvider>
              <Header />
              <Message />
              <Drawer />
              <Contact />
              <InnnerComponent />
            </MessageProvider>
          </DrawerProvider>
        </AuthProvider>
      </BrowserRouter>
      <Footer />
    </ContactProvider>
  );
}

export default App;
