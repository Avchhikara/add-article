import React from "react";

import AppContext from "./AppContext";

class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        token: "",
        name: ""
      },
      loginUser: ({ email, name, token }) => {
        this.setState({
          user: {
            name,
            email,
            token
          }
        });
        // console.log(this.state);
      },
      article: "",
      updateArticle: article => this.setState({ article })
    };
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
