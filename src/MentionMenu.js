import React from "react";
import portal from "react-portal-hoc";

const MentionMenu = props => {
  const {
    active,
    className,
    item: Item,
    options,
    top,
    left,
    hoverItem,
    selectItem,
    style = {}
  } = props;
  const menuStyle = {
    ...style,
    left,
    top,
    position: "absolute"
  };
  return (
    <div style={menuStyle} className={className}>
      {options.map((option, idx) => {
        return (
          <div key={idx} onClick={selectItem(idx)} onMouseOver={hoverItem(idx)}>
            <Item active={active === idx} {...option} />
          </div>
        );
      })}
    </div>
  );
};

export default portal({ clickToClose: true, escToClose: true })(MentionMenu);
