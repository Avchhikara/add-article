import React from "react";

import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Label,
  Col,
  Button,
  Input,
  FormText,
  Spinner,
  Alert
} from "reactstrap";
import { Formik, Field } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";
import { api } from "./../../utils/constants";

import AppContext from "./../AppProvider/AppContext";

import "./style.scss";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: {
        message: "",
        status: false
      }
    };
  }

  componentDidMount() {
    const hash = decodeURI(window.location.hash).split("=");
    // console.log(window.location);
    // console.log(typeof message);

    if (hash[1]) {
      this.setState({
        response: {
          status: true,
          message: hash[1]
        }
      });
    }
  }

  onLoggingIn(values, loginUser, setSubmitting, resetForm) {
    axios
      .post(`${api}/register`, {
        type: "LOGIN",
        payload: { ...values }
      })
      .then(({ data }) => {
        // now, here push the user to login page and such sort of stuff
        this.setState({
          response: {
            status: true,
            message: data.message
          }
        });

        // resetForm();
        setSubmitting(false);
        // Now, push the user to dashboard ?
        // Also, update the context API state
        loginUser({ ...data });
        this.props.history.push("/dashboard");
        // console.log(this.props);
      })
      .catch(err => {
        // first, setting the state to the error
        this.setState({
          response: {
            status: false,
            message: err.response.data
          }
        });
        setSubmitting(false);
      });
  }

  render() {
    return (
      <AppContext.Consumer>
        {({ loginUser }) => {
          return (
            <div className="add-login-wrapper container">
              <Row>
                <Card>
                  <CardBody>
                    {this.state.response.message.length ? (
                      <Alert
                        color={
                          this.state.response.status ? "success" : "danger"
                        }
                      >
                        {this.state.response.message}
                      </Alert>
                    ) : (
                      <noscript />
                    )}
                    <CardTitle>
                      <h4 className="text-success">Login</h4>
                    </CardTitle>
                    <Formik
                      initialValues={{ email: "", password: "" }}
                      validate={values => {
                        let errors = {};
                        // conditions for the validation

                        if (!values.email) {
                          errors.email = "email is required";
                        } else if (
                          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                            values.email
                          )
                        ) {
                          errors.email = "Email is invalid";
                        }

                        if (!values.password) {
                          errors.password = "password is required";
                        }

                        return errors;
                      }}
                      onSubmit={(values, { setSubmitting, resetForm }) => {
                        // What to do when the form is submitted
                        // setSubmitting(false);
                        //   console.log(actions);
                        // Now, making an api request here

                        this.onLoggingIn(
                          values,
                          loginUser,
                          setSubmitting,
                          resetForm
                        );
                      }}
                      render={({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting
                      }) => {
                        return (
                          <Form onSubmit={handleSubmit}>
                            <FormGroup row>
                              <Label for="email" sm={4}>
                                Email
                              </Label>
                              <Col sm={8}>
                                <Input
                                  type="email"
                                  name="email"
                                  id="email"
                                  placeholder="email-id here"
                                  invalid={!!errors.email}
                                  tag={Field}
                                />
                                <div className="invalid-feedback">
                                  {errors && touched.email && errors.email}
                                </div>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="password" sm={4}>
                                Password
                              </Label>
                              <Col sm={8}>
                                <Input
                                  type="password"
                                  name="password"
                                  id="password"
                                  tag={Field}
                                  placeholder="password here"
                                  invalid={errors && errors.password}
                                />
                                <div className="invalid-feedback">
                                  {errors &&
                                    touched.password &&
                                    errors.password}
                                </div>
                              </Col>
                            </FormGroup>
                            <Col sm={12} className="login-button">
                              <Button color="success" onClick={handleSubmit}>
                                {isSubmitting ? (
                                  <Spinner size="sm" color="light" />
                                ) : (
                                  "Login"
                                )}
                              </Button>
                            </Col>
                            <Col sm={12}>
                              New User?{" "}
                              <Link to="/register">Register here</Link>
                            </Col>
                          </Form>
                        );
                      }}
                    />
                  </CardBody>
                </Card>
              </Row>
            </div>
          );
        }}
      </AppContext.Consumer>
    );
  }
}

export default Login;
