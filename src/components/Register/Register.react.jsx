import React from "react";

import { Formik, Field } from "formik";
import AppContext from "./../AppProvider/AppContext";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Button,
  Col,
  Form,
  FormGroup,
  Spinner,
  Label,
  Input,
  Alert
} from "reactstrap";

import { api } from "./../../utils/constants";

import "./style.scss";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      response: {
        message: "",
        status: true
      }
    };
    this.registerValues = this.registerValues.bind(this);
  }

  componentDidMount() {
    // This function will show the messages in the url that has been passed for the user
    // Implement same function for the login page

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

  registerValues(values, loginUser, setSubmitting, resetForm) {
    // Do register thing here after passing values to the api and move the user to another link
    // Now, making a request with axios
    axios
      .post(`${api}/register`, {
        type: "REGISTER",
        payload: {
          ...values
        }
      })
      .then(({ data }) => {
        setSubmitting(false);
        this.setState({
          response: {
            status: true,
            message: data.message
          }
        });
        resetForm();
      })
      .catch(err => {
        setSubmitting(false);
        console.log(err.response);
        this.setState({
          response: {
            status: false,
            message: err.response.data
          }
        });
        resetForm();
      });

    // setSubmitting(false);
  }

  render() {
    return (
      <AppContext.Consumer>
        {(user, loginUser) => {
          // this.setState({user});
          return (
            <div className="add-register-wrapper container">
              <Row>
                <Card className="col-sm-8">
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
                      <h4 className="text-success">Register</h4>
                    </CardTitle>
                    <Formik
                      initialValues={{
                        email: "",
                        name: "",
                        password: ""
                      }}
                      validate={values => {
                        let errors = {};
                        // Do some validation here
                        if (!values.name) {
                          errors.name = "Name is required";
                        } else if (values.name.length < 3) {
                          errors.name =
                            "Name should be alteast of 3 characters";
                        }

                        if (!values.email) {
                          errors.email = "email is required!";
                        } else if (
                          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                            values.email
                          )
                        ) {
                          errors.email = "Invalid email";
                        }

                        if (!values.password) {
                          errors.password = "password is required!";
                        } else if (
                          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{5,}$/g.test(
                            values.password
                          )
                        ) {
                          errors.password =
                            "password should have one uppercase, one lowercase , one numeral and atleast five characters in total";
                        }

                        return errors;
                      }}
                      onSubmit={(values, { setSubmitting, resetForm }) => {
                        // setSubmitting(false);
                        this.registerValues(
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
                              <Label for="name" sm={4}>
                                Name
                              </Label>
                              <Col sm={8}>
                                <Input
                                  type="text"
                                  name="name"
                                  id="name"
                                  placeholder="Your Good name here"
                                  invalid={touched.name && !!errors.name}
                                  tag={Field}
                                  autoFocus
                                />
                                <div className="invalid-feedback">
                                  {errors && touched.name && errors.name}
                                </div>
                              </Col>
                            </FormGroup>
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
                                  invalid={touched.email && !!errors.email}
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
                                  placeholder="Strong password here"
                                  invalid={
                                    touched.password && !!errors.password
                                  }
                                  tag={Field}
                                />
                                <div className="invalid-feedback">
                                  {errors &&
                                    touched.password &&
                                    errors.password}
                                </div>
                              </Col>
                            </FormGroup>
                            <Col sm={12} className="register-button">
                              <Button color="success" onClick={handleSubmit}>
                                {isSubmitting ? (
                                  <Spinner size="sm" color="light" />
                                ) : (
                                  "Register"
                                )}
                              </Button>
                            </Col>
                            <Col sm={12}>
                              Already Registered?{" "}
                              <Link to="/login">Login here</Link>
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

export default Register;
