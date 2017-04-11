import React, {Component, Children} from 'react';
import getCaretCoords from 'textarea-caret';
import MentionMenu from "./MentionMenu";

const getMenuProps = (keystrokeTriggered, children) => {
  const child = Array.isArray(children) ? children[keystrokeTriggered] : children;
  return child ? child.props : {};
};

class MentionWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      child: {},
      options: []
    };
    const {children} = props;
    this.triggers = Children.map(children, (child) => child.props.trigger);
  }


  makeOptions = async(query, resolve) => {
    const options = await resolve(query);
    this.setState({
      options
    })
  };

  maybeMention() {
    const textBeforeCaret = this.ref.value.slice(0, this.ref.selectionStart);
    const triggerIdx = textBeforeCaret.lastIndexOf(' ') + 1;
    const maybeTrigger = textBeforeCaret[triggerIdx];
    const keystrokeTriggered = this.triggers.indexOf(maybeTrigger);
    if (keystrokeTriggered !== -1) {
      const query = textBeforeCaret.slice(triggerIdx + 1);
      const coords = getCaretCoords(this.ref, this.ref.selectionStart);
      const {top, left} = this.ref.getBoundingClientRect();
      const child = getMenuProps(keystrokeTriggered, this.props.children);
      const {resolve} = child;
      this.makeOptions(query, resolve);
      // that stupid bug where the caret moves to the end happens unless we do it next tick
      setTimeout(() => {
        this.setState({
          active: 0,
          child,
          left: coords.left + left + this.ref.scrollLeft,
          triggerIdx,
          top: coords.top + top - this.ref.scrollTop
        })
      }, 0)
    } else {
      this.closeMenu();
    }
  }

  closeMenu() {
    setTimeout(() => {
      this.setState({
        child: {},
        options: [],
        left: undefined,
        top: undefined,
        triggerIdx: undefined
      })
    }, 0)
  }

  handleInput = (e) => {
    const {onInput} = this.props;
    if (onInput) {
      onInput(e);
    }
    this.maybeMention();
  };

  inputRef = (c) => {
    this.ref = c;
    const {getRef} = this.props;
    if (getRef) {
      getRef(c);
    }
  };

  handleKeyDown = (e) => {
    const {options, active, triggerIdx} = this.state;
    if (triggerIdx !== undefined) {
      if (e.key === 'ArrowDown') {
        this.setState({
          active: Math.min(active + 1, options.length - 1)
        })
        e.preventDefault();
      } else if (e.key === 'ArrowUp') {
        this.setState({
          active: Math.max(active - 1, 0)
        })
        e.preventDefault();
      } else if (e.key === 'Tab' || e.key === 'Enter') {
        const preMention = this.ref.value.substr(0, triggerIdx + 1);
        const mention = options[active].value + ' ';
        const postMention = this.ref.value.substr(this.ref.selectionStart);
        this.ref.value = `${preMention}${mention}${postMention}`
        const {onChange} = this.props;
        if (onChange) {
          onChange(e);
        }
        const caretPosition = this.ref.value.length - postMention.length;
        this.ref.setSelectionRange(caretPosition, caretPosition);
        e.preventDefault();
        this.closeMenu();
      }
    }
  }

  render() {
    const {component, getRef, ...inputProps} = this.props;
    const {active, child, left, top, options} = this.state;
    const {item, className, style} = child;
    return (
      <div>
        <textarea {...inputProps} ref={this.inputRef} onInput={this.handleInput} onKeyDown={this.handleKeyDown}/>
        <MentionMenu
          active={active}
          className={className}
          left={left}
          isOpen={Boolean(options.length)}
          item={item}
          options={options}
          style={style}
          top={top}
        />
      </div>
    );
  }
}

export default MentionWrapper;
