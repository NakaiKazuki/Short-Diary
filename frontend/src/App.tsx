import { BrowserRouter as Router, Switch } from "react-router-dom";

// cotexts
import { AuthProvider } from "./contexts/Auth";
import { MessageProvider } from "./contexts/Message";

// routes
import { GuestRoute, PrivateRoute, LoggedInRoute } from "./routes";

// components
import { Header } from "./containers/Header";
import { Message } from "./containers/Message";
import { Footer } from "./containers/Footer";
import { LogoutHome } from "./containers/LogoutHome";
import { LoginHome } from "./containers/LoginHome";
import { SignUp } from "./containers/SignUp";
import { Login } from "./containers/Login";
import { UserEdit } from "./containers/UserEdit";

function App() {
  return (
    <Router>
      <AuthProvider>
        <MessageProvider>
          <Header />
          <Message />
          <Switch>
            <LoggedInRoute
              exact
              path="/"
              login={<LoginHome />}
              logout={<LogoutHome />}
            />
            <GuestRoute exact path="/signup" children={<SignUp />} />
            <GuestRoute exact path="/login" children={<Login />} />
            <PrivateRoute exact path="/userEdit" children={<UserEdit />} />
          </Switch>
        </MessageProvider>
      </AuthProvider>
      <Footer />
    </Router>
  );
}

export default App;
