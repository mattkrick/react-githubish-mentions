import React from 'react';
import portal from 'react-portal-hoc';

const MentionMenu = (props) => {
  const {active, className, isOpen, item: Item, options, top, left, style = {}} = props;
  const menuStyle = {
    ...style,
    left,
    top,
    position: 'absolute'
  };
  if (!isOpen) {
    return null;
  }
  return (
    <div style={menuStyle} className={className}>
      {options.map((option, idx) => <Item key={idx} active={active === idx} {...option}/>)}
    </div>
  )
};

export default portal({clickToClose: true, escToClose: true})(MentionMenu);
