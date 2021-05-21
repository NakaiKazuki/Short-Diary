import { BrowserRouter as Router, Switch} from 'react-router-dom';

// cotexts
import {CurrentUserProvider} from './contexts/CurrentUser';

// routes
import { GuestRoute , LoggedInRoute} from './routes';

// components
import { Header } from './containers/Header';
import { Footer } from './containers/Footer';
import { LogoutHome } from './containers/LogoutHome';
import { LoginHome } from './containers/LoginHome';
import { SignUp } from './containers/SignUp';
import { Login } from './containers/Login';

function App() {
  return (
    <Router>
      <CurrentUserProvider>
        <Header />
        <Switch>
          <LoggedInRoute exact path='/' login={<LoginHome />} logout={<LogoutHome />} />
          <GuestRoute exact path='/signup' children={<SignUp/>} />
          <GuestRoute exact path='/login' children={<Login/>} />
        </Switch>
      </CurrentUserProvider>
      <Footer />
    </Router>
  );
}

export default App;
