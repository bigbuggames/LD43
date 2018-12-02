import React from 'react';
import styled from 'styled-components';

import Config from 'constants/Config';
import { getRandomInt } from 'utils/random';

const StyledBird = styled.div`
  position: absolute;
  left: ${props => props.x || '250'}px;
  top: ${props => props.y || '510'}px;

  width: 254px;
  height: 328px;
  /* border: 3px dashed lightgreen; */

  transform-origin: top right;
  transform: 
    rotateY(${props => props.mirror ? '180deg' : '0deg' })
    scale(${props => props.scale});

  background-image: url(${props => props.url});
  background-repeat: no-repeat;
  display: block;
`;

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
