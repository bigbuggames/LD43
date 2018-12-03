import React from 'react';

import { StyledBird } from './Elements';
import Config from 'constants/Config';
import { getRandomInt } from 'utils/random';

class Bird extends React.PureComponent {
  static IDLE = './images/bird-sing-03.png';
  static SING = [
    './images/bird-sing-01.png',
    './images/bird-sing-02.png'
  ];

  state = {
    birdAnimation: Bird.IDLE
  }
    
  getRandomBirdSprite = () => {
    return Bird.SING[getRandomInt(0, Bird.SING.length - 1)];
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pressedKeys.toString() !== this.props.pressedKeys.toString()) {

      // Sing state
      if (this.props.pressedKeys.length > 0) {

        // Check that not the same sprite is chosen
        let spriteNumber = this.getRandomBirdSprite();
        while(spriteNumber === this.state.birdAnimation) {
          spriteNumber = this.getRandomBirdSprite();
        }

        this.setState({ 
          birdAnimation: spriteNumber
        });

      // Idle state
      } else {
        this.setState({ 
          birdAnimation: Bird.IDLE
        });
      }
    }
  }

  render() {
    return <StyledBird {...this.props} url={this.state.birdAnimation} />
  }
}

export default Bird;
