import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
    <Fragment>
      <Router>
        <AuthProvider>
          <MessageProvider>
            <Header />
            <Message />
            <Routes>
              <Route
                path="/"
                element={
                  <LoggedInRoute
                  login={<LoginHome />}
                  logout={<LogoutHome />}
                />
                }
              />
              <Route
                path="/signup"
                element={<GuestRoute children={<SignUp />}/>}
              />
              <Route
                path="/login"
                element={<GuestRoute children={<Login />}/>}
              />
              <Route
                path="/userEdit"
                element={<PrivateRoute children={<UserEdit />}/>}
              />
            </Routes>
          </MessageProvider>
        </AuthProvider>
      </Router>
      <Footer />
    </Fragment>
  );
}

export default App;
