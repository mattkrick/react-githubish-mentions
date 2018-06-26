import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class MentionPortal extends Component {
  onClickFunc = event => {
    this.props.closeOnClick && this.props.closeFunc();
  }

  onEscFunc = event => {
    if (this.props.closeOnEsc && event.keyCode === 27) {
      this.props.closeFunc();
    }
  }

  componentDidMount() {
    if (document) {
      document.addEventListener("click", this.onClickFunc);
      document.addEventListener("keyup", this.onEscFunc);
    }
  }

  componentWillMount() {
    this.portal = document.createElement("div");
    document.body.appendChild(this.portal);
  }

  componentWillUnmount() {
    if (document) {
      document.removeEventListener("click", this.onClickFunc);
      document.removeEventListener("keyup", this.onEscFunc);
    }
    document.body.removeChild(this.portal);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.portal);
  }
}

MentionPortal.propTypes = {
  closeFunc: PropTypes.func.isRequired,
  closeOnClick: PropTypes.bool.isRequired,
  closeOnEsc: PropTypes.bool.isRequired
};

MentionPortal.defaultProps = {
  closeOnClick: true,
  closeOnEsc: true
}

export default MentionPortal;