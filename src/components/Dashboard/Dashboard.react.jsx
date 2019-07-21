import React from "react";

import { Row, Col, Button } from "reactstrap";

import AppContext from "./../AppProvider/AppContext";
import { connect } from "./../../utils/renderWithContext";
import DEditor from "./../Editor";
import ArticlePreview from "./../ArticlePreview";
// import { Editor } from "@tinymce/tinymce-react";

import "./Dashboard.style.scss";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      response: {
        status: false,
        message: ""
      }
    };
  }

  componentDidMount() {
    console.log(this.props);
    // Now, checking whether the credentials are  present or not
    if (!this.props.user.token) {
      this.props.history.push("/login?m=Please login first!");
      //   window.location.href = "/add#/login";
    }
  }
  //   handleEditorChange = e => {
  //     console.log("Content was updated:", e.target.getContent());
  //   };

  render() {
    return (
      <div className="dashboard-wrapper container-fluid">
        <Row>
          <Col sm={6}>
            <DEditor updateArticle={this.props.updateArticle} />
            <Button color="success">Publish</Button>
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
