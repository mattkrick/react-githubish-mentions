import React from "react";
import PropTypes from "prop-types";

class MentionPortal extends React.Component {
  static propTypes = {
    close: PropTypes.func.isRequired,
    closeOnClick: PropTypes.bool.isRequired,
    closeOnEsc: PropTypes.bool.isRequired
  };

  static defaultProps = {
    closeOnEsc: true,
    closeOnClick: true
  };

  onDocumentClick = e => {
    this.props.closeOnClick && this.props.close();
  };

  onDocumentEsc = e => {
    if (this.props.closeOnEsc && event.keyCode === 27) {
      this.props.close();
    }
  };

  componentDidMount() {
    if (document) {
      document.addEventListener("click", this.onDocumentClick);
      document.addEventListener("keyup", this.onDocumentEsc);
    }
  }

  componentWillUnmount() {
    if (document) {
      document.removeEventListener("click", this.onDocumentClick);
      document.removeEventListener("keyup", this.onDocumentEsc);
    }
  }

  render() {
    return this.props.children;
  }
}

export default MentionPortal;
