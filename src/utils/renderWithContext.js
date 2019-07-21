import React from "react";

export const connect = Component => {
  return AppContext => {
    return props => {
      return (
        <AppContext.Consumer>
          {context => <Component {...context} {...props} />}
        </AppContext.Consumer>
      );
    };
  };
};
