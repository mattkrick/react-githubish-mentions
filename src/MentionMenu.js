import React from "react";
import portal from "react-portal-hoc";

class MentionMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: props.left,
      top: props.top
    };
  }
  componentWillReceiveProps(nextProps) {
    let left = nextProps.left;
    let top = nextProps.top;

    //prevent menu from going off the right of the screen
    if (this.node && left + this.node.offsetWidth > window.innerWidth) {
      left = window.innerWidth - (this.node.offsetWidth + 10);
    }
    //prevent menu from going off bottom of screen
    if (this.node && top + this.node.offsetHeight > window.innerHeight) {
      top = window.innerHeight - (this.node.offsetHeight + 10);
    }

    if (left != this.state.left || top != this.state.top) {
      this.setState({ left, top });
    }
  }
  componentDidMount() {
    //prevent menu from going off the right of the screen
    if (this.node && this.props.left + this.node.offsetWidth > window.innerWidth) {
      this.setState({ left: window.innerWidth - (this.node.offsetWidth + 10) });
    }
    //prevent menu from going off bottom of screen
    if (this.node && this.props.top + this.node.offsetHeight > window.innerHeight) {
      this.setState({ top: window.innerHeight - (this.node.offsetHeight + 10) });
    }
  }
  render() {
    const {
      active,
      className,
      item: Item,
      options,
      hoverItem,
      selectItem,
      style = {}
    } = this.props;

    const {
      top,
      left
    } = this.state;

    const menuStyle = {
      ...style,
      left,
      top,
      position: "absolute"
    };

    return (
      <div style={menuStyle} className={className} ref={node => this.node = node}>
        {options.map((option, idx) => {
          return (
            <div key={idx} onClick={selectItem(idx)} onMouseOver={hoverItem(idx)}>
              <Item active={active === idx} {...option} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default portal({ clickToClose: true, escToClose: true })(MentionMenu);
