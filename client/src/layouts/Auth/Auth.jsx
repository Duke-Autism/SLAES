import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Redirect, Switch } from "react-router-dom";

import AuthNavbar from "../../components/Navbars/AuthNavbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import googleButton from '../../components/Login/google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png'

import routes from "../../routes.js";

import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Row
} from "reactstrap";

var ps;


class LoginForm extends React.Component {
      componentDidMount() {
        if (navigator.platform.indexOf("Win") > -1) {
          ps = new PerfectScrollbar(this.refs.fullPages);
        }
      }
      componentWillUnmount() {
        if (navigator.platform.indexOf("Win") > -1) {
          ps.destroy();
        }
      }

      constructor() {
    		super()
    		this.state = {
    			username: '',
    			password: '',
    			redirectTo: null
    		}
    		// this.googleSignin = this.googleSignin.bind(this)
    		this.handleSubmit = this.handleSubmit.bind(this)
    		this.handleChange = this.handleChange.bind(this)
    	}

      handleChange(event) {
    		this.setState({
    			[event.target.name]: event.target.value
    		})
    }

    	handleSubmit(event) {
    		event.preventDefault()
    		console.log('handleSubmit')
    		this.props._login(this.state.username, this.state.password)
    		this.setState({
    			redirectTo: '/'
    		})
    	}



render() {
      if (this.state.redirectTo) {
        return <Redirect to={{ pathname: this.state.redirectTo }} />
      } else {
        return (
        <>
        <AuthNavbar />
          <div className="wrapper wrapper-full-page" ref="fullPages">
            <div className="full-page section-image">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" lg="4" md="6">
                <Form action="" className="form" method="">
                  <Card className="card-login">
                    <CardHeader>
                      <CardHeader>
                        <h3 className="header text-center">Login</h3>
                      </CardHeader>
                    </CardHeader>
                    <CardBody>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Email"
                          type="text"
                          name="username"
                          onChange={this.handleChange}
                          value={this.state.username}
                         />
                      </InputGroup>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-key-25" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password"
                          type="password"
                          name="password"
                          autoComplete="off"
                          value={this.state.password}
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                      </CardBody>
                      <CardBody>
                      <Button
                        block
                        className="btn-lg"
                        color="warning"
                        onClick={this.handleSubmit}
                      >
                        Get Started
                      </Button>
                    </CardBody>
                    <CardFooter>
                      <Button
                        block
                        className="btn-round btn-sm mb-3"
                        color="info"
                        href="/auth/google"
                      >
                        Sign in with google
                      </Button>
                    </CardFooter>
                  </Card>
                </Form>
              </Col>
            </Row>
          </Container>
          <div
            className="full-page-background"
            style={{
              backgroundImage: `url(${require("../../assets/img/bg/fabio-mangione.jpg")})`
            }}
          />
          <Footer fluid />
          </div>
        </div>
      </>
      );
      }
   }
}

export default LoginForm;
