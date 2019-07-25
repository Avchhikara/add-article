import React from "react";

import AddArticleRouter from "./src/components/AddArticleRouter";
import AppProvider from "./src/components/AppProvider";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <AppProvider>
      <AddArticleRouter />
    </AppProvider>
  );
};

export default App;
