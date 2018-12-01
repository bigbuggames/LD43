import React from 'react';

import ObservableArray from 'utils/ObservableArray';

export default class Keyboard extends React.Component {
  state = {
    pressedKeys: [],
    soundArray: ObservableArray((target, keys) => {
      this.setState({
        pressedKeys: target
      })
    })
  };

  handleKeyDown = document.addEventListener('keydown', event => {
    if (event.repeat === false) {
      this.state.soundArray.push(event.key);
    }
  });

  handleKeyUp = document.addEventListener('keyup', event => {
    if (event.repeat === false) {
      this.state.soundArray.pop(event.key);
    }
  });

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keyup', this.keyUpHandler);
  }

  // TODO: Add multiple key support
  render() {
    return (
      <React.Fragment>{this.props.children(this.state.pressedKeys)}</React.Fragment>
    );
  }
}
