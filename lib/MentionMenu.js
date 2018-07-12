"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactPortalHoc = require("react-portal-hoc");

var _reactPortalHoc2 = _interopRequireDefault(_reactPortalHoc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MentionMenu = function (_React$Component) {
  _inherits(MentionMenu, _React$Component);

  function MentionMenu(props) {
    _classCallCheck(this, MentionMenu);

    var _this = _possibleConstructorReturn(this, (MentionMenu.__proto__ || Object.getPrototypeOf(MentionMenu)).call(this, props));

    _this.state = {
      left: props.left,
      top: props.top
    };
    return _this;
  }

  _createClass(MentionMenu, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var left = nextProps.left;
      var top = nextProps.top;

      //prevent menu from going off the right of the screen
      if (this.node && left + this.node.offsetWidth > window.innerWidth) {
        left = window.innerWidth - (this.node.offsetWidth + 10);
      }
      //prevent menu from going off bottom of screen
      if (this.node && top + this.node.offsetHeight > window.innerHeight) {
        top = window.innerHeight - (this.node.offsetHeight + 10);
      }

      if (left != this.state.left || top != this.state.top) {
        this.setState({ left: left, top: top });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      //prevent menu from going off the right of the screen
      if (this.node && this.props.left + this.node.offsetWidth > window.innerWidth) {
        this.setState({ left: window.innerWidth - (this.node.offsetWidth + 10) });
      }
      //prevent menu from going off bottom of screen
      if (this.node && this.props.top + this.node.offsetHeight > window.innerHeight) {
        this.setState({ top: window.innerHeight - (this.node.offsetHeight + 10) });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          active = _props.active,
          className = _props.className,
          Item = _props.item,
          options = _props.options,
          hoverItem = _props.hoverItem,
          selectItem = _props.selectItem,
          _props$style = _props.style,
          style = _props$style === undefined ? {} : _props$style;
      var _state = this.state,
          top = _state.top,
          left = _state.left;


      var menuStyle = _extends({}, style, {
        left: left,
        top: top,
        position: "absolute"
      });

      return _react2.default.createElement(
        "div",
        { style: menuStyle, className: className, ref: function ref(node) {
            return _this2.node = node;
          } },
        options.map(function (option, idx) {
          return _react2.default.createElement(
            "div",
            { key: idx, onClick: selectItem(idx), onMouseOver: hoverItem(idx) },
            _react2.default.createElement(Item, _extends({ active: active === idx }, option))
          );
        })
      );
    }
  }]);

  return MentionMenu;
}(_react2.default.Component);

exports.default = (0, _reactPortalHoc2.default)({ clickToClose: true, escToClose: true })(MentionMenu);