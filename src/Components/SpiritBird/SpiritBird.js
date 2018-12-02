import React from 'react';
import styled, { keyframes } from 'styled-components';

import spawnSpritesheet from '../../../assets/images/respawn.png';
import idleSpritesheet from '../../../assets/images/spirit-bird-idle.png';
import sacrificeSpritesheet from '../../../assets/images/sacrifice.png';

const animations = {
  'spawn': keyframes`
    from { background-position: 0 -5px; }
    to { background-position: -31973px -5px; }
  `,
  'idle': keyframes`
    from { background-position: 0 0; }
    to { background-position: -20944px 0; }
  `,
  'sacrifice': keyframes`
    from { background-position: 0 0; }
    to { background-position: -1020px 0; }
  `,
};

const Spawn = styled.div`
  width: 656px;
  height: 668px;
  background: url(${spawnSpritesheet}) left center;
  animation: ${animations['spawn']} ${props => props.duration}s steps(48) infinite;
`

const Idle = styled.div`
  width: 238px;
  height: 222px;
  background: url(${idleSpritesheet}) left center;
  animation: ${animations['idle']} ${props => props.duration}s steps(88) infinite;
  transform-origin: top left;
  transform: 
    scale(${props => props.scale})
    rotateY(${props => props.mirror ? 180 : 0}deg)
    translateX(-238px);
`

const sacrificeFrames = (position) => keyframes`
  from {
    transform: translateX(0, 0);
  }

  to {
    transform: translate(${position.x}px, ${position.y}px);
  }
`;

const AnimationContainer = styled.div`
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;

  transform-origin: top left;
  transform: rotateY(${props => props.mirror ? 180 : 0}deg);

  /* border: 2px dashed lightgreen; */
`;

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

  getSacrifice = (endPosition) => {
    const keyframeAnim = sacrificeFrames(endPosition);
  
    return styled.div`
      width: 60px;
      height: 81px;
      background: url(${sacrificeSpritesheet}) left center;
      transform-origin: top left;
      animation: 
        ${animations['sacrifice']} ${props => props.duration}s steps(17) infinite,
        ${keyframeAnim} 1.2s linear;
    `
  }

  render() {
    const sacrificeEndPosition = {
      x: this.props.sunPosition.x - this.props.position.x,
      y: this.props.sunPosition.y - this.props.position.y
    };

    const Sacrifice = this.getSacrifice(sacrificeEndPosition);

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
          <Sacrifice duration={1.2} mirror={this.props.mirror} />
        }

      </AnimationContainer>
    );
  }
}
