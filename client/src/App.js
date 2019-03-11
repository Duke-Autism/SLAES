import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import AuthLayout from "./layouts/Auth/Auth.jsx";
import AdminLayout from "./layouts/Admin/Admin.jsx";

// import "bootstrap/dist/css/bootstrap.css";
import "./assets/scss/paper-dashboard.scss";
import "./assets/demo/demo.css";

const hist = createBrowserHistory();

/*The <Route> component is the main part of React Router. Anywhere that you want to only render content based on the location’s pathname, you should use a <Route> element. */

/* The Route component expects a path prop, which is a string that describes the pathname that the route matches */

/* The <Switch> will iterate over routes and only render the first one that matches the current pathname */

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router history={hist}>
        <Switch>
          <Route path="/auth" render={props => <AuthLayout {...props} />} />
          <Route path="/admin" render={props => <AdminLayout {...props} />} />
          <Route path="/admin"  component = {AdminLayout}/>
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
