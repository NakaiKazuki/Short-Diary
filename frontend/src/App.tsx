import { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";

// routes
import { InnnerComponent } from "./routes/InnerComponent";

// components
import { Footer } from "./containers/Footer";

function App() {
  return (
    <Fragment>
      <Router>
        <InnnerComponent />
      </Router>
      <Footer />
    </Fragment>
  );
}

export default App;
