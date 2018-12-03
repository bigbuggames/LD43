import styled, { keyframes } from 'styled-components';

import mandala from '../../../assets/images/mandala.png';
import explosionSpritesheet from '../../../assets/images/explosion.png';
import implosion from '../../../assets/images/implosion.png';

export const Anchor = styled.div`
  position: absolute;
  top: 865px;
  height: 1000px;
  width: 500px;
  left: 50%;
  z-index: -1;
`;

export const Mandala = styled.div`
  transform: translate(-50%, -50%);

  height: ${props => props.boundary}px;
  width: ${props => props.boundary}px;
  border-radius: 50%;
  background-image: url(${mandala});
  background-position: center;
  background-color: #fad48b;
  box-shadow: 0 0 0 10px #fad48b;
`;

const explode = keyframes`
  from { background-position: 0 0; }
  to { background-position: -28000px 0; }
`;

export const Explosion = styled.div`
  width: 1000px;
  height: 638px;
  background: url(${explosionSpritesheet});
  transform: translate(
    -${props => props.boundary}px, 
    -${props => props.boundary}px
  );
  animation: ${explode} 2400ms steps(28) backwards;
`;

const implode = keyframes`
  from { transform: scale(1); }
  to { transform: scale(0.1); }
`;

export const Implosion = styled.div`
  height: ${props => props.boundary}px;
  width: ${props => props.boundary}px;
  background-image: url(${implosion});
  background-position: center;
`;
