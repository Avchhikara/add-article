import React from "react";

import { Link } from "react-router-dom";
import { Jumbotron, ButtonGroup, Button } from "reactstrap";

import "./style.scss";

class AddArticleHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false
    };
  }

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  render() {
    // console.log(this.props);
    if (this.state.isMounted) {
      return (
        <div className="add-article-home-wrapper">
          <Jumbotron>
            <h2>Lorem, ipsum dolor.</h2>
            <p className="lead">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit a sapiente saepe quibusdam accusamus ipsam
              dignissimos, architecto culpa accusantium, excepturi eum.
              Architecto soluta repellat explicabo commodi accusantium excepturi
              asperiores eveniet voluptatibus ratione minus quasi reiciendis
              magni necessitatibus quibusdam harum cumque tenetur quidem itaque,
              odio magnam enim voluptatem rerum suscipit fuga.
            </p>
            <hr className="my-2" />
            <Button
              color="success"
              outline
              onClick={() => {
                this.props.history.push("/login");
              }}
            >
              Login
            </Button>
            <Button
              color="success"
              onClick={() => {
                this.props.history.push("/register");
              }}
            >
              Register
            </Button>
          </Jumbotron>
        </div>
      );
    } else {
      return <div className="add-article-home-wrapper">Loading...</div>;
    }
  }
}

export default AddArticleHome;
