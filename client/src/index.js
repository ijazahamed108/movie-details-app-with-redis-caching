import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { Navbar } from "reactstrap";

import MovieDetails from "./components/MovieDetails";
import App from "./components/App";

import "bootstrap/dist/css/bootstrap.min.css";

//SPA - Single Page Applications
const rootElement = document.getElementById("root");
ReactDOM.render(
  <Router>
    <StrictMode>
      <Link to="/">
        <Navbar color="secondary" light className="text-white">
          <h1> Movies App</h1>
        </Navbar>
      </Link>
      <Switch>
        <Route path="/:movieId" component={MovieDetails} />
        <Route path="/" component={App} />
      </Switch>
    </StrictMode>
  </Router>,
  rootElement
);
