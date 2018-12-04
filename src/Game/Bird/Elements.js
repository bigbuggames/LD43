import styled, { keyframes, css } from 'styled-components';
import _ from 'lodash';

import birdIdleSpritesheet from '../../../assets/images/bird-idle.png';
import birdSacrifice from '../../../assets/images/bird-sacrifice.png';
import birdSing01 from '../../../assets/images/birdSing10001.png';
import birdSing02 from '../../../assets/images/bird-sing-02.png';
import birdSing03 from '../../../assets/images/bird-sing-03.png';

export const animations = {
  'idle': keyframes`
    from { background-position: 0 0; }
    to { background-position: -20944px 0; }
  `,
  'sacrifice': birdSacrifice,
  'sing': [ birdSing01, birdSing02, birdSing03 ]
};

export const Idle = styled.div`
  width: 238px;
  height: 222px;
  background-image: url(${birdIdleSpritesheet});
  background-origin: top left;
  animation: ${animations['idle']} ${props => props.duration}s steps(88) infinite;
`

export const Sing = styled.div`
  width: 254px;
  height: 328px;
  background-repeat: no-repeat;
  display: block;
  background-origin: top left;
  background-image: url(${props => props.url});
`

export const Sacrifice = styled.div`
  width: 254px;
  height: 328px;
  background-origin: top left;
  background-image: url(${animations['sacrifice']});
  background-repeat: no-repeat;
  display: block;
`

export const AnimationContainer = styled.div`
  position: absolute;

  ${props => props.state === 0 
    ? css`
      left: 250px;
      top: 610px;
      width: 238px;
       height: 222px;
    `
    : css`
      left: 250px;
      top: 510px;
      height: 328px;
      width: 254px;
    `
  }

  /* border: 3px dashed lightgreen; */

  transform-origin: top right;
  transform: 
    rotateY(${props => props.mirror ? '180deg' : '0deg' })
    scale(${props => props.scale});
`;
