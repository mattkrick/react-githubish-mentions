'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MentionScrollBar = function MentionScrollBar(_ref) {
  var active = _ref.active,
      className = _ref.className,
      Item = _ref.item,
      options = _ref.options,
      hoverItem = _ref.hoverItem,
      selectItem = _ref.selectItem,
      _ref$style = _ref.style,
      style = _ref$style === undefined ? {} : _ref$style;

  var menuStyle = _extends({}, style, {
    top: '0',
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
  });

  return _react2.default.createElement(
    'div',
    { style: menuStyle, className: className },
    options.map(function (option, idx) {
      return _react2.default.createElement(
        'div',
        { key: idx, onClick: selectItem(idx), onMouseOver: hoverItem(idx) },
        _react2.default.createElement(Item, _extends({ active: active === idx }, option))
      );
    })
  );
};

exports.default = MentionScrollBar;