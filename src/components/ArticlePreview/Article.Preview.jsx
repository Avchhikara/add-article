import React from "react";

import PreviewArea from "./PreviewArea.react";

import "./style.scss";

class ArticlePreview extends React.Component {
  constructor(props) {
    super(props);
  }

  //   componentDidMount() {
  //     // const previewContainer = document.querySelector(".preview-container");
  //     // console.log(previewContainer);
  //   }

  render() {
    return (
      <div className="article-preview-wrapper">
        <div>
          <span className="h4">Preview</span> (how the article will be visible){" "}
        </div>
        <PreviewArea {...this.props} />
      </div>
    );
  }
}

export default ArticlePreview;
