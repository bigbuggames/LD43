import React from 'react';

import { AnimationContainer, Spawn, Idle, getSacrifice } from './Elements';

export default class SpiritBird extends React.Component {
  static SPAWN = 0;
  static IDLE = 1;
  static SACRIFICE = 2;

  state = {
    animationState: SpiritBird.SPAWN,
    blocked: true
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ animationState: SpiritBird.IDLE, blocked: false });
    }, 3400);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.pressedKeys.toString() === this.props.pressedKeys.toString() ||
      this.state.blocked === true
    ) {
      return;
    }

    if (this.props.pressedKeys.includes(' ')) {
      this.setState(
        { animationState: SpiritBird.SACRIFICE, blocked: true },
        () => {
          setTimeout(() => {
            this.props.handleUnmount();
          }, 1200);
        }
      );
    }
  }

  render() {
    const sacrificeEndPosition = {
      x: this.props.sunPosition.x - this.props.position.x,
      y: this.props.sunPosition.y - this.props.position.y
    };
    
    const Sacrifice = getSacrifice(sacrificeEndPosition);

    return (
      <AnimationContainer x={this.props.position.x} y={this.props.position.y}>

        {this.state.animationState === SpiritBird.SPAWN && 
          <Spawn duration={3.4} />
        }

        {this.state.animationState === SpiritBird.IDLE &&
          <Idle 
            duration={6.3} 
            mirror={this.props.mirror} 
            scale={this.props.scale} 
          />
        }

        {this.state.animationState === SpiritBird.SACRIFICE && 
          <Sacrifice 
            duration={1.2} 
            mirror={this.props.mirror}
          />
        }

      </AnimationContainer>
    );
  }
}
