"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _textareaCaret = require("textarea-caret");

var _textareaCaret2 = _interopRequireDefault(_textareaCaret);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _MentionMenu = require("./MentionMenu");

var _MentionMenu2 = _interopRequireDefault(_MentionMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getMenuProps = function getMenuProps(keystrokeTriggered, children) {
  var child = Array.isArray(children) ? children[keystrokeTriggered] : children;
  return child ? child.props : {};
};

var defaultReplace = function defaultReplace(userObj, trigger) {
  return "" + trigger + userObj.value + " ";
};

var MentionWrapper = function (_Component) {
  _inherits(MentionWrapper, _Component);

  function MentionWrapper(props) {
    var _this2 = this;

    _classCallCheck(this, MentionWrapper);

    var _this = _possibleConstructorReturn(this, (MentionWrapper.__proto__ || Object.getPrototypeOf(MentionWrapper)).call(this, props));

    _this.makeOptions = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(query, resolve) {
        var options;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return resolve(query);

              case 2:
                options = _context.sent;

                if (options.length > 0) {
                  _this.setState({
                    options: options
                  });
                } else {
                  _this.closeMenu();
                }

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.handleInput = function (e) {
      _this.maybeMention();
      var onInput = _this.props.onInput;

      if (onInput) {
        onInput(e);
      }
    };

    _this.inputRef = function (c) {
      _this.ref = c;
      var getRef = _this.props.getRef;

      if (getRef) {
        getRef(c);
      }
    };

    _this.handleBlur = function (e) {
      // if the menu is open, don't treat a click as a blur (required for the click handler)
      var onBlur = _this.props.onBlur;

      if (onBlur && !_this.state.top) {
        onBlur(e);
      }
    };

    _this.handleKeyDown = function (e) {
      var _this$state = _this.state,
          options = _this$state.options,
          active = _this$state.active,
          triggerIdx = _this$state.triggerIdx;

      var keyCaught = void 0;
      if (triggerIdx !== undefined) {
        if (e.key === "ArrowDown") {
          _this.setState({
            active: Math.min(active + 1, options.length - 1)
          });
          keyCaught = true;
        } else if (e.key === "ArrowUp") {
          _this.setState({
            active: Math.max(active - 1, 0)
          });
          keyCaught = true;
        } else if (e.key === "Tab" || e.key === "Enter") {
          _this.selectItem(active)(e);
          keyCaught = true;
        }
      }
      var onKeyDown = _this.props.onKeyDown;

      if (keyCaught) {
        e.preventDefault();
      } else if (onKeyDown) {
        // only call the passed in keyDown handler if the key wasn't one of ours
        onKeyDown(e);
      }
    };

    _this.selectItem = function (active) {
      return function (e) {
        var _this$state2 = _this.state,
            options = _this$state2.options,
            triggerIdx = _this$state2.triggerIdx;

        var preMention = _this.ref.value.substr(0, triggerIdx);
        var option = options[active];
        var mention = _this.replace(option, _this.ref.value[triggerIdx]);
        var postMention = _this.ref.value.substr(_this.ref.selectionStart);
        var newValue = "" + preMention + mention + postMention;
        _this.ref.value = newValue;
        var onChange = _this.props.onChange;

        if (onChange) {
          onChange(e, newValue);
        }
        var caretPosition = _this.ref.value.length - postMention.length;
        _this.ref.setSelectionRange(caretPosition, caretPosition);
        _this.closeMenu();
        _this.ref.focus();
      };
    };

    _this.setActiveOnEvent = function (active) {
      return function (e) {
        _this.setState({
          active: active
        });
      };
    };

    _this.state = {
      child: {},
      options: []
    };
    var children = props.children;

    _this.triggers = _react.Children.map(children, function (child) {
      return child.props.trigger;
    });
    _this.closeMenu = _this.closeMenu.bind(_this);
    return _this;
  }

  _createClass(MentionWrapper, [{
    key: "maybeMention",
    value: function maybeMention() {
      var _this3 = this;

      // get the text preceding the cursor position
      var textBeforeCaret = this.ref.value.slice(0, this.ref.selectionStart);

      // split string by whitespaces and get the last word (where the cursor currently stands)
      var tokens = textBeforeCaret.split(/\s/);
      var lastToken = tokens[tokens.length - 1];

      // check if the text befor the caret ends with the last word
      var triggerIdx = textBeforeCaret.endsWith(lastToken) ? textBeforeCaret.length - lastToken.length : -1;
      // and if that last word starts with a trigger
      var maybeTrigger = textBeforeCaret[triggerIdx];
      var keystrokeTriggered = this.triggers.indexOf(maybeTrigger);

      if (keystrokeTriggered !== -1) {
        (function () {
          var positionIndex = _this3.ref.selectionStart;
          if (_this3.props.position === "start") {
            positionIndex = triggerIdx + 1;
          }
          var query = textBeforeCaret.slice(triggerIdx + 1);
          var coords = (0, _textareaCaret2.default)(_this3.ref, positionIndex);

          var _ref$getBoundingClien = _this3.ref.getBoundingClientRect(),
              top = _ref$getBoundingClien.top,
              left = _ref$getBoundingClien.left;

          var child = getMenuProps(keystrokeTriggered, _this3.props.children);
          var replace = child.replace,
              resolve = child.resolve;

          _this3.replace = replace || defaultReplace;
          _this3.makeOptions(query, resolve);
          // that stupid bug where the caret moves to the end happens unless we do it next tick
          setTimeout(function () {
            _this3.setState({
              active: 0,
              child: child,
              left: window.pageXOffset + coords.left + left + _this3.ref.scrollLeft,
              triggerIdx: triggerIdx,
              top: (window.pageYOffset || 0) + coords.top + top + coords.height - _this3.ref.scrollTop
            });
          }, 0);
        })();
      } else {
        this.closeMenu();
      }
    }
  }, {
    key: "closeMenu",
    value: function closeMenu() {
      var _this4 = this;

      setTimeout(function () {
        _this4.setState({
          child: {},
          options: [],
          left: undefined,
          top: undefined,
          triggerIdx: undefined
        });
      }, 0);
    }
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          children = _props.children,
          component = _props.component,
          CustomComponent = _props.CustomComponent,
          getRef = _props.getRef,
          containerStyle = _props.containerStyle,
          textWrapperClassName = _props.textWrapperClassName,
          inputProps = _objectWithoutProperties(_props, ["children", "component", "CustomComponent", "getRef", "containerStyle", "textWrapperClassName"]);

      var _state = this.state,
          active = _state.active,
          child = _state.child,
          left = _state.left,
          top = _state.top,
          options = _state.options;
      var item = child.item,
          className = child.className,
          style = child.style;


      return _react2.default.createElement(
        "div",
        { className: textWrapperClassName, style: containerStyle },
        _react2.default.createElement("textarea", _extends({}, inputProps, {
          ref: this.inputRef,
          onBlur: this.handleBlur,
          onInput: this.handleInput,
          onKeyDown: this.handleKeyDown
        })),
        CustomComponent ? top !== undefined && _react2.default.createElement(CustomComponent, {
          active: active,
          className: className,
          closeFunc: this.closeMenu,
          left: left,
          isOpen: options.length > 0,
          item: item,
          options: options,
          hoverItem: this.setActiveOnEvent,
          selectItem: this.selectItem,
          style: style,
          top: top
        }) : top !== undefined && _react2.default.createElement(_MentionMenu2.default, {
          active: active,
          className: className,
          left: left,
          isOpen: options.length > 0,
          item: item,
          options: options,
          hoverItem: this.setActiveOnEvent,
          selectItem: this.selectItem,
          style: style,
          top: top
        })
      );
    }
  }]);

  return MentionWrapper;
}(_react.Component);

MentionWrapper.propTypes = {
  position: _propTypes2.default.oneOf(["start", "caret"])
};

MentionWrapper.defaultProps = {
  position: "caret"
};

exports.default = MentionWrapper;