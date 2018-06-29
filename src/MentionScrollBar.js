import React from 'react';

const MentionScrollBar = ({
  active,
  className,
  item: Item,
  options,
  hoverItem,
  selectItem,
  style = {}
}) => {
  const menuStyle = {
    ...style,
    top: '0',
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
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
}

export default MentionScrollBar;