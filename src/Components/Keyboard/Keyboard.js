import React from 'react';

export default class Keyboard extends React.Component {
  state = {
    key: ''
  };

  componentDidMount() {
    this.keyDownHandler = document.addEventListener('keydown', event => {
      if (event.repeat === false) {
        this.setState({
          key: event.key
        });
      }
    });

    this.keyUpHandler = document.addEventListener('keyup', event => {
      if (event.repeat === false) {
        this.setState({
          key: ''
        });
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keydown', this.keyUpHandler);
  }

  /**
   * Avoiding key repetition
   */
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.key !== nextState.key;
  }

  // TODO: Add multiple key support
  render() {
    return (
      <React.Fragment>{this.props.children(this.state.key)}</React.Fragment>
    );
  }
}
