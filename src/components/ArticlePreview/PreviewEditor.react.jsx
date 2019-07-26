import React from "react";

import parse from "html-react-parser";

class PreviewEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventAddCount: 0
    };
  }

  componentDidMount() {
    // Scroll here
    const preview = document.querySelector("#preview-container");
    if (preview) {
      preview.addEventListener("mouseover", () => {
        // console.log("over");
      });
    }
  }

  scrollToTop = preview => {
    // preview.target.scrollTo({
    //   top: 0,
    //   left: 0,
    //   behavior: "smooth"
    // });
    // preview.target.removeEventListener("mouseover", this.scrollToTop, true);
  };

  componentWillReceiveProps(props) {
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    const preview = document.querySelector("#preview-container");
    if (preview) {
      // console.log(preview.clientHeight, preview.scrollHeight);
      preview.scrollTo(0, preview.scrollHeight);
      if (this.state.eventAddCount === 0) {
        preview.addEventListener("mouseover", this.scrollToTop);

        this.setState({ eventAddCount: 1 });
      }
    }
  };

  render() {
    const { data } = this.props;

    return (
      <div className="preview-container" id="preview-container">
        {parse(data)}
      </div>
    );
  }
}

export default PreviewEditor;
