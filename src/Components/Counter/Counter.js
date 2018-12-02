import React from 'react';

export default class Counter extends React.Component {
  static CLEAR = 0;
  static RUNNING = 1;
  static PAUSED = 2;

  static defaultProps = {
    interval: 1000,
    stage: Counter.CLEAR
  };

  state = {
    count: 0
  };

  tick = () => {
    if (this.props.stage === Counter.RUNNING) {
      this.counterId = setTimeout(() => {
        this.setState(
          {
            count: this.state.count + 1
          },
          this.tick
        );
      }, this.props.interval);
    }

    if (this.props.stage === Counter.PAUSED) {
      clearTimeout(this.counterId);
    }

    if (this.props.stage === Counter.CLEAR) {
      clearTimeout(this.counterId);
      this.setState({ count: 0 });
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.stage !== this.props.stage) {
      this.tick();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.counterId);
  }

  render() {
    return <div>{this.props.children(this.state.count)}</div>;
  }
}
