import styled, { keyframes } from 'styled-components';

import spawnSpritesheet from '../../../assets/images/respawn.png';
import idleSpritesheet from '../../../assets/images/spirit-bird-idle.png';
import sacrificeSpritesheet from '../../../assets/images/sacrifice.png';

export const AnimationContainer = styled.div`
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;

  transform-origin: top left;
  transform: rotateY(${props => props.mirror ? 180 : 0}deg);
`;

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

export const Spawn = styled.div`
  width: 656px;
  height: 668px;
  background: url(${spawnSpritesheet}) left center;
  animation: ${animations['spawn']} ${props => props.duration}s steps(48) infinite;
`

export const Idle = styled.div`
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

export const getSacrifice = (endPosition) => {
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
