import React from "react";

import { Row, Col, Button, Spinner, Input, Label, FormGroup } from "reactstrap";
import axios from "axios";

import AppContext from "./../AppProvider/AppContext";
import { connect } from "./../../utils/renderWithContext";
import DEditor from "./../Editor";
import ArticlePreview from "./../ArticlePreview";
// import { Editor } from "@tinymce/tinymce-react";

import { api } from "./../../utils/constants";

import "./Dashboard.style.scss";
import { DH_NOT_SUITABLE_GENERATOR } from "constants";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: {
        type: "danger",
        message: ""
      },
      isSubmitting: false
    };
  }

  componentDidMount() {
    // console.log(this.props);
    // Now, checking whether the credentials are  present or not
    if (!this.props.user.token) {
      this.props.history.push("/login?m=Please login first!");
      //   window.location.href = "/add#/login";
    }
  }
  //   handleEditorChange = e => {
  //     console.log("Content was updated:", e.target.getContent());
  //   };

  handleTitle = e => {
    this.props.updateTitle(e.target.value);
    // console.log(this.props.article);
  };

  handlePublish = () => {
    if (!this.props.article.title) {
      this.setState({
        response: {
          type: "danger",
          message: "Please add a title for the article"
        }
      });
    } else if (this.props.article.data.length < 100) {
      this.setState({
        response: {
          type: "danger",
          message: "The length of data should be more that 100 characters"
        }
      });
    } else {
      this.setState({
        isSubmitting: true,
        response: {
          type: "success",
          message: ""
        }
      });

      const { data, title } = this.props.article;

      axios.defaults.headers["token"] = this.props.user.token;
      const send = {
        type: "PUBLISH",
        payload: {
          token: this.props.user.token,
          data: data,
          title: title
        }
      };

      axios
        .post(`${api}/article`, send)
        .then(({ data }) => {
          this.setState({
            response: {
              type: "success",
              message: data.message
            }
          });
          this.setState({ isSubmitting: false });
        })
        .catch(err => {
          console.log("Publish Error => ", err.response);
          this.setState({ isSubmitting: false });
        });
    }
  };

  render() {
    return (
      <div className="dashboard-wrapper container-fluid">
        <Row>
          <Col sm={6}>
            <FormGroup row>
              <Label for="title" sm={2}>
                Title
              </Label>
              <Col sm={10}>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="an awesome 👌 title here"
                  onChange={this.handleTitle}
                />
              </Col>
            </FormGroup>
            <div className="dashboard-content">Content of your article 👇</div>
            <DEditor updateData={this.props.updateData} />
            {this.state.response.message.length ? (
              <div className={`text-${this.state.response.type}`}>
                {this.state.response.message}
              </div>
            ) : (
              <noscript />
            )}
            <Button
              color="success"
              onClick={this.handlePublish}
              disabled={this.state.isSubmitting}
            >
              {this.state.isSubmitting ? (
                <Spinner size="sm" color="white" />
              ) : (
                "Publish 🚀"
              )}
            </Button>
          </Col>
          <Col sm={6}>
            <ArticlePreview article={this.props.article} />
          </Col>
        </Row>
      </div>
    );
  }
}

// const Render = Dashboard => {
//   return AppContext => {
//     return () => {
//       return (
//         <AppContext.Consumer>
//           {context => <Dashboard {...context} />}
//         </AppContext.Consumer>
//       );
//     };
//   };
// };

export default connect(Dashboard)(AppContext);
