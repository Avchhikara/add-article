import React from "react";

import { HashRouter, Switch, Route } from "react-router-dom";

import AddArticleHome from "./../AddArticleHome";
import Login from "./../Login";
import Register from "./../Register";
import Dashboard from "./../Dashboard";
import NavBar from "./../NavBar";

class AddArticleRouter extends React.Component {
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
    if (this.state.isMounted) {
      return (
        <HashRouter>
          <Route path="/" component={NavBar} />
          <Switch>
            <Route path="/" exact component={AddArticleHome} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/dashboard" exact component={Dashboard} />
          </Switch>
        </HashRouter>
      );
    } else {
      return <div>Some component showing loading..</div>;
    }
  }
}
export default AddArticleRouter;
