import React from "react";

import AddArticleRouter from "./src/components/AddArticleRouter";
import AppProvider from "./src/components/AppProvider";

const App = () => {
  return (
    <AppProvider>
      <AddArticleRouter />
    </AppProvider>
  );
};

export default App;
