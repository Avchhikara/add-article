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
      article: {
        data: "",
        title: "",
        tags: []
      },
      updateData: data =>
        this.setState({
          article: {
            data,
            title: this.state.article.title,
            tags: this.state.article.tags
          }
        }),
      updateTitle: title =>
        this.setState({
          article: {
            data: this.state.article.data,
            title,
            tags: this.state.article.tags
          }
        }),
      logout: () =>
        this.setState({
          user: {
            email: "",
            token: "",
            name: ""
          }
        })
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
