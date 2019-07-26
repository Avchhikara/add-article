import React from "react";

import PreviewTitle from "./PreviewTitle.react";
import PreviewEditor from "./PreviewEditor.react";

const PreviewArea = props => {
  const { data, title } = props.article;
  // console.log(data);
  if (title && !data) {
    return <PreviewTitle title={title} />;
  } else if (title && data) {
    return (
      <div className="preview-container-wrapper">
        <PreviewTitle title={title} />
        <PreviewEditor data={data} />
      </div>
    );
  } else {
    return <div>Now, tips will be shown here</div>;
  }
};

export default PreviewArea;
