import React, { Component } from 'react'
import axios from 'axios'
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import LoginForm from './components/Login/LoginForm'
import AuthLayout from "./layouts/Auth/Auth.jsx";
import AdminLayout from "./layouts/Admin/Admin.jsx";

// import "bootstrap/dist/css/bootstrap.css";
import "./assets/scss/paper-dashboard.scss";
import "./assets/demo/demo.css";

const hist = createBrowserHistory();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    props.isloggedIn === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
  )} />
)
/*The <Route> component is the main part of React Router. Anywhere that you want to only render content based on the location’s pathname, you should use a <Route> element. */

/* The Route component expects a path prop, which is a string that describes the pathname that the route matches */

/* The <Switch> will iterate over routes and only render the first one that matches the current pathname */

class App extends Component {
  constructor() {
  		super()
  		this.state = {
  			loggedIn: false,
  			user: null
  		}
  		this._logout = this._logout.bind(this)
  		this._login = this._login.bind(this)
  	}
  	componentDidMount() {
  		axios.get('/auth/user').then(response => {
  			console.log(response.data)
  			if (!!response.data.user) {
  				console.log('THERE IS A USER')
  				this.setState({
  					loggedIn: true,
  					user: response.data.user
  				})
  			} else {
  				this.setState({
  					loggedIn: false,
  					user: null
  				})
  			}
  		})
  	}

  	_logout(event) {
  		event.preventDefault()
  		console.log('logging out')
  		axios.post('/auth/logout').then(response => {
  			console.log(response.data)
  			if (response.status === 200) {
  				this.setState({
  					loggedIn: false,
  					user: null
  				})
  			}
  		})
  	}

  	_login(username, password) {
  		axios
  			.post('/auth/login', {
  				username,
  				password
  			})
  			.then(response => {
  				console.log(response)
  				if (response.status === 200) {
  					// update the state
  					this.setState({
  						loggedIn: true,
  						user: response.data.user
  					})
  				}
  			})
  }


  render() {
    return (
      <div className="App">
      <Router history={hist}>
      <Switch>
        <Route path="/login" render={props => <AuthLayout {...props} />} />
        // <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <PrivateRoute loggedIn={this.state.loggedIn} path='/dashboard' component={AdminLayout} />
      </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
