import React from 'react';

import { AnimationContainer, Idle, Sing, Sacrifice, animations } from './Elements';

// FIXME: Need use this kind of imports instead.
// TODO: Remove paths from states
// TODO: Add idle animation to bird
// TODO: Trigger correct images on each step

class Bird extends React.PureComponent {
  static IDLE = 0;
  static SING = 1;
  static SACRIFICE = 2;

  state = {
    birdState: Bird.IDLE
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pressedKeys.toString() !== this.props.pressedKeys.toString()) {

      // Sacrifice state
      if (this.props.pressedKeys.includes(' ') === true) {
        this.setState({ 
          birdState: Bird.SACRIFICE
        });
        return;
      }

      // Sing state
      if (this.props.pressedKeys.length > 0) {
        this.setState({ 
          birdState: Bird.SING
        });
        return;
      }

      // Idle state
      this.setState({ 
        birdState: Bird.IDLE
      });
    }  
  }

  render() {
    return (
      <AnimationContainer state={this.state.birdState}>

        {this.state.birdState === Bird.IDLE && 
          <Idle duration={6.3} />
        }

        {this.state.birdState === Bird.SING &&
          <Sing url={_.sample(animations['sing'])} />
        }

        {this.state.birdState === Bird.SACRIFICE &&
          <Sacrifice />
        }

      </AnimationContainer>
    )
  }
}

export default Bird;
